import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  tags: string[];
  date: string;
  readTime: number;
  published: boolean;
}

interface BlogContextType {
  posts: BlogPost[];
  addPost: (post: Omit<BlogPost, 'id'>) => void;
  updatePost: (id: string, post: Partial<BlogPost>) => void;
  deletePost: (id: string) => void;
  getPost: (id: string) => BlogPost | undefined;
  getPublishedPosts: () => BlogPost[];
}

const BlogContext = createContext<BlogContextType | undefined>(undefined);

const initialPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Building Production-Ready RAG Pipelines: What Actually Works',
    content: `# Building Production-Ready RAG Pipelines: What Actually Works

After deploying RAG systems for enterprise clients at Lyzr AI, I've found that the gap between a demo RAG pipeline and one that survives production load is wider than most tutorials suggest. This post distills the key architectural decisions that actually matter.

## The Core Problem with Naive RAG

A basic RAG pipeline — embed query → retrieve top-k chunks → stuff into prompt — works well in demos and completely falls apart when:

- Documents have overlapping, contradictory, or highly technical content
- Users ask multi-hop questions that span multiple documents
- The embedding model's semantic space doesn't match the retrieval intent
- You need to explain *why* a particular chunk was retrieved

Every one of these failure modes produces confident-sounding hallucinations. The LLM doesn't know it's missing context; it generates plausible text regardless.

## Retrieval Architecture That Scales

### Hybrid Search: Sparse + Dense

Pure dense (vector) retrieval misses exact keyword matches — critical for technical docs, product names, version numbers. Pure sparse (BM25) misses semantic similarity. The fix is obvious but under-deployed:

\`\`\`python
from langchain.retrievers import EnsembleRetriever

retriever = EnsembleRetriever(
    retrievers=[bm25_retriever, dense_retriever],
    weights=[0.4, 0.6],
)
\`\`\`

The weight tuning depends on your corpus. For code-heavy docs, I lean sparse (0.5/0.5). For conversational support content, lean dense.

### Contextual Chunking Over Fixed Windows

Fixed 512-token chunks break mid-sentence and strip surrounding context. Instead, chunk at semantic boundaries — paragraphs, sections, list items — and prepend a context header:

\`\`\`python
def contextualize_chunk(doc_title: str, section: str, chunk: str) -> str:
    return f"[{doc_title} > {section}]\n{chunk}"
\`\`\`

This alone improved relevance scores on our internal eval set by ~18%.

### Re-ranking as the Quality Gate

Retrieval optimizes recall; re-ranking optimizes precision. A cross-encoder re-ranker (e.g., Cohere Rerank, BGE) evaluates query-chunk pairs jointly and reorders the top-k results before they reach the LLM. It's a cheap way to filter noise.

## Hallucination Reduction in Practice

### Grounding Assertions

Before generating, verify that every factual claim in the retrieved context is traceable to a source chunk. An LLM-as-judge prompt works well here:

\`\`\`python
GROUNDING_PROMPT = """
Context chunks: {chunks}
Candidate answer: {answer}

For each factual claim in the answer, cite the chunk ID that supports it.
If a claim is not supported, mark it as UNSUPPORTED.
"""
\`\`\`

Flagging UNSUPPORTED claims and refusing to return them reduced hallucination complaints from enterprise clients by ~60%.

### Confidence Thresholds

Not all queries deserve an answer. If max retrieved similarity score is below 0.72 (empirically tuned per corpus), surface "I don't have enough information" rather than guessing. Counterintuitive for product teams, but users trust the system far more when it knows what it doesn't know.

## Infrastructure Considerations

- **Vector DB choice**: Pgvector for <10M vectors with transactional consistency needs; Qdrant or Weaviate for pure vector workloads at scale.
- **Embedding model**: OpenAI text-embedding-3-small is hard to beat on cost/quality; for on-prem, BGE-M3 is excellent.
- **Caching**: Cache embeddings of frequently seen queries. A Redis layer with 24h TTL reduced embedding API costs by ~40% in one deployment.
- **Async pipelines**: Retrieval and re-ranking run concurrently; LLM call waits on both. Fastapi + asyncio makes this straightforward.

## Eval-Driven Development

None of the above matters without evaluation. Build a golden dataset (50-100 Q&A pairs from real users), and measure faithfulness, answer relevance, and context recall at every change. The RAGAS framework provides decent automated metrics as a baseline.

The teams that ship reliable RAG systems are the ones treating it like software engineering — with tests, CI, and clear success metrics — not like a research demo.`,
    excerpt: 'Lessons from deploying RAG systems in production: hybrid retrieval, contextual chunking, cross-encoder re-ranking, and hallucination grounding techniques that actually reduce noise at enterprise scale.',
    tags: ['RAG', 'LLM', 'AI Engineering', 'Production', 'Python'],
    date: '2025-06-10',
    readTime: 9,
    published: true,
  },
  {
    id: '2',
    title: 'LangGraph for AI Agents: Moving Beyond Linear Chains',
    content: `# LangGraph for AI Agents: Moving Beyond Linear Chains

LangChain chains are great for deterministic pipelines. But real-world AI agents need branching logic, loops, shared state, and the ability to recover from partial failures. LangGraph solves this by modeling agent execution as a stateful graph. Here's how I've used it in production at Lyzr AI.

## Why Graphs Beat Chains for Complex Agents

A linear chain assumes every step succeeds and flows forward. An agent that can:

- Retry failed tool calls with a modified approach
- Branch on tool output (e.g., escalate to human if confidence is low)
- Maintain memory across multiple tool invocations
- Run parallel sub-tasks and merge results

...needs conditional edges, loops, and shared state. That's what LangGraph provides.

## Core Concepts

### State as the Single Source of Truth

Every node in the graph reads from and writes to a shared TypedDict state. This eliminates the "passing context through kwargs" anti-pattern:

\`\`\`python
from typing import TypedDict, Annotated
import operator

class AgentState(TypedDict):
    messages: Annotated[list, operator.add]
    tool_results: dict
    retry_count: int
    final_answer: str | None
\`\`\`

The \`Annotated[list, operator.add]\` annotation tells LangGraph to append rather than overwrite — crucial for message history.

### Conditional Edges for Decision Logic

\`\`\`python
def route_after_tool(state: AgentState) -> str:
    if state["retry_count"] > 2:
        return "escalate"
    if state["tool_results"].get("error"):
        return "retry"
    return "synthesize"

graph.add_conditional_edges("tool_executor", route_after_tool, {
    "escalate":  "human_handoff",
    "retry":     "tool_executor",
    "synthesize":"answer_generator",
})
\`\`\`

This is the key primitive. Most complex agent behavior reduces to routing decisions at each node.

## A Document Processing Agent

Here's a simplified version of an agent I built for automated document analysis:

\`\`\`python
from langgraph.graph import StateGraph, END

builder = StateGraph(AgentState)

builder.add_node("parse_document",    parse_document_node)
builder.add_node("extract_entities",  extract_entities_node)
builder.add_node("validate_entities", validate_node)
builder.add_node("enrich_context",    rag_enrichment_node)
builder.add_node("generate_summary",  summarize_node)

builder.set_entry_point("parse_document")
builder.add_edge("parse_document",   "extract_entities")
builder.add_edge("extract_entities", "validate_entities")

builder.add_conditional_edges("validate_entities", check_quality, {
    "pass":  "enrich_context",
    "retry": "extract_entities",
    "fail":  END,
})

builder.add_edge("enrich_context",  "generate_summary")
builder.add_edge("generate_summary", END)

agent = builder.compile()
\`\`\`

The validation loop between \`validate_entities\` and \`extract_entities\` handles the common case where the first extraction attempt is incomplete.

## Persistence and Human-in-the-Loop

LangGraph's checkpointing API lets you pause execution and resume later — essential for long-running agents and human approval workflows:

\`\`\`python
from langgraph.checkpoint.sqlite import SqliteSaver

checkpointer = SqliteSaver.from_conn_string("./agent_state.db")
agent = builder.compile(checkpointer=checkpointer, interrupt_before=["human_handoff"])

# First run — pauses at human_handoff
result = agent.invoke(input_data, config={"configurable": {"thread_id": "job-123"}})

# After human approval, resume from checkpoint
final = agent.invoke(Command(resume=human_approval), config={"configurable": {"thread_id": "job-123"}})
\`\`\`

This pattern powers the approval workflows in our enterprise deployments — no polling, no custom state management, just graph-native checkpoints.

## Lessons from Production

- **Keep nodes small**: Each node should do one thing. Fat nodes are hard to debug and impossible to re-use.
- **Log state at every transition**: The state dict is your debugger. Log it. Structured logging (JSON) into a tool like Datadog makes graph traversal traceable.
- **Test with subgraphs**: Extract complex branches as subgraphs and unit-test them independently before wiring into the main graph.
- **Handle streaming**: Langgraph supports token-level streaming out of the box — wire it to your WebSocket layer early, not as an afterthought.

LangGraph shifts the mental model from "prompt chain" to "stateful process" — and that shift is what separates toy demos from agents that handle real business logic.`,
    excerpt: 'How LangGraph\'s stateful graph model enables branching logic, retry loops, and human-in-the-loop workflows that plain LangChain chains cannot express — with production patterns from real deployments.',
    tags: ['LangGraph', 'AI Agents', 'LangChain', 'Python', 'Architecture'],
    date: '2025-05-22',
    readTime: 10,
    published: true,
  },
  {
    id: '3',
    title: 'FastAPI + PostgreSQL at Scale: Patterns I Wish I Knew Earlier',
    content: `# FastAPI + PostgreSQL at Scale: Patterns I Wish I Knew Earlier

FastAPI is genuinely great — fast to write, fast to run, great type hints. But defaults that work fine in a tutorial application start causing silent performance problems at production scale. Here are the patterns that made the biggest difference in my work at Lyzr AI and Shridhar LifeSchool.

## Connection Pooling: The Non-Obvious Default

SQLAlchemy's default pool size is 5. For a service handling 50+ concurrent requests, this means queue buildup and P99 latency spikes under load.

\`\`\`python
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker

engine = create_async_engine(
    DATABASE_URL,
    pool_size=20,
    max_overflow=10,
    pool_timeout=30,
    pool_pre_ping=True,   # validates connections before use
    pool_recycle=1800,    # prevents stale connection errors
)

AsyncSessionLocal = sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)
\`\`\`

\`pool_pre_ping=True\` is particularly important with managed databases (RDS, Cloud SQL) that terminate idle connections — it silently reconnects instead of raising a cryptic error.

## Dependency Injection for Clean Request Scoping

The canonical FastAPI pattern:

\`\`\`python
from contextlib import asynccontextmanager
from fastapi import Depends

async def get_db():
    async with AsyncSessionLocal() as session:
        try:
            yield session
            await session.commit()
        except Exception:
            await session.rollback()
            raise

@router.post("/agents/{agent_id}/run")
async def run_agent(
    agent_id: str,
    payload: RunPayload,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    ...
\`\`\`

The session is committed on success, rolled back on exception, and closed unconditionally — all within the request scope. Straightforward, but easy to get wrong (forgetting rollback, leaking sessions).

## N+1 Queries: The Silent Performance Killer

ORMs make it trivially easy to trigger N+1 query patterns. Profiling a slow endpoint often reveals 50 queries where 2 would suffice.

\`\`\`python
# Bad — triggers N queries for N agents
agents = await db.execute(select(Agent))
for agent in agents.scalars():
    print(agent.workflows)  # lazy load per agent

# Good — one query with joined load
from sqlalchemy.orm import selectinload

result = await db.execute(
    select(Agent).options(selectinload(Agent.workflows))
)
\`\`\`

\`selectinload\` issues a single \`IN\` query for the related objects. For deeply nested relationships, \`joinedload\` can be more efficient but watch for cartesian products on one-to-many joins.

## Background Tasks Without Celery

For simple async work (sending emails, triggering webhooks, logging analytics), FastAPI's \`BackgroundTasks\` eliminates the need for a Celery/Redis stack:

\`\`\`python
from fastapi import BackgroundTasks

def send_completion_webhook(agent_run_id: str, result: dict):
    # runs after response is returned to client
    requests.post(webhook_url, json={"run_id": agent_run_id, "result": result})

@router.post("/agents/{agent_id}/run")
async def run_agent(bg: BackgroundTasks, ...):
    result = await execute_agent(...)
    bg.add_task(send_completion_webhook, agent_run_id, result)
    return {"status": "complete", "result": result}
\`\`\`

For anything involving retries, priorities, or cross-service coordination, move to a proper queue. But for fire-and-forget tasks, this is clean and zero-dependency.

## Structured Error Handling

Consistent error shapes make frontend integration and debugging dramatically easier:

\`\`\`python
from fastapi import Request
from fastapi.responses import JSONResponse

class AppError(Exception):
    def __init__(self, code: str, message: str, status: int = 400):
        self.code, self.message, self.status = code, message, status

@app.exception_handler(AppError)
async def app_error_handler(request: Request, exc: AppError):
    return JSONResponse(
        status_code=exc.status,
        content={"error": {"code": exc.code, "message": exc.message}},
    )
\`\`\`

Every error in the codebase raises \`AppError\` with a machine-readable code. The frontend never parses freeform error strings.

## Index Strategy

The most impactful database optimization is often just adding the right index. Composite indexes for common filter+sort patterns:

\`\`\`sql
-- agents filtered by org, sorted by created_at
CREATE INDEX CONCURRENTLY idx_agents_org_created
    ON agents (organization_id, created_at DESC)
    WHERE deleted_at IS NULL;
\`\`\`

\`CONCURRENTLY\` avoids locking in production. The partial index (\`WHERE deleted_at IS NULL\`) keeps the index smaller and faster for the 99% case where you only query active records.

These aren't glamorous improvements — but in aggregate they're the difference between a FastAPI service that handles 1,000 req/min comfortably and one that buckles at 200.`,
    excerpt: 'Production FastAPI + PostgreSQL patterns covering async connection pooling, selectinload vs lazy loading to prevent N+1 queries, background tasks, structured error handling, and index strategy.',
    tags: ['FastAPI', 'PostgreSQL', 'Python', 'Backend', 'Performance'],
    date: '2025-04-14',
    readTime: 8,
    published: true,
  },
];

export const BlogProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [posts, setPosts] = useState<BlogPost[]>(initialPosts);

  const addPost = (post: Omit<BlogPost, 'id'>) => {
    const newPost: BlogPost = {
      ...post,
      id: Date.now().toString(),
    };
    setPosts(prev => [newPost, ...prev]);
  };

  const updatePost = (id: string, updatedPost: Partial<BlogPost>) => {
    setPosts(prev => prev.map(post => 
      post.id === id ? { ...post, ...updatedPost } : post
    ));
  };

  const deletePost = (id: string) => {
    setPosts(prev => prev.filter(post => post.id !== id));
  };

  const getPost = (id: string) => {
    return posts.find(post => post.id === id);
  };

  const getPublishedPosts = () => {
    return posts.filter(post => post.published).sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  };

  const value: BlogContextType = {
    posts,
    addPost,
    updatePost,
    deletePost,
    getPost,
    getPublishedPosts,
  };

  return (
    <BlogContext.Provider value={value}>
      {children}
    </BlogContext.Provider>
  );
};

export const useBlog = () => {
  const context = useContext(BlogContext);
  if (context === undefined) {
    throw new Error('useBlog must be used within a BlogProvider');
  }
  return context;
};