export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  publishedDate: string;
  readTime: string;
  featured: boolean;
  image?: string;
}

export const articles: Article[] = [
  {
    id: 'building-docscan-ai-ocr',
    title: 'Building DocScan AI: From OCR to Production-Ready Document Processing',
    excerpt: 'A deep dive into building an AI-powered document scanning system that processes 10,000+ invoices monthly with 98% accuracy using Python, TensorFlow, and Tesseract OCR.',
    content: `
# Building DocScan AI: From OCR to Production-Ready Document Processing

When I started building DocScan AI, the challenge was clear: automate the manual processing of thousands of tax invoices, receipts, and bank statements that were consuming 200+ hours of human labor monthly.

## The Problem

Manual data entry from financial documents is:
- Time-consuming (10-15 minutes per document)
- Error-prone (human error rate ~5-8%)
- Expensive (significant labor costs)
- Not scalable (bottlenecks during peak periods)

## Technical Architecture

### 1. Document Classification
First, the system needs to identify document types. I used a CNN model trained on labeled examples:

**Tech Stack:**
- TensorFlow 2.x for deep learning
- Custom CNN architecture with ResNet backbone
- Data augmentation for rotation, blur, and lighting variations

**Results:** 99.2% classification accuracy across 3 document types

### 2. OCR Pipeline
The OCR pipeline is the heart of the system:

**Pre-processing:**
- Image deskewing using OpenCV
- Noise reduction with bilateral filtering
- Adaptive thresholding for binarization
- Border detection and cropping

**Text Extraction:**
- Tesseract OCR 5.0 with Indonesian + English trained data
- Custom LSTM model for handwritten numbers
- Confidence scoring per field

**Post-processing:**
- Regex patterns for structured data (dates, amounts, tax IDs)
- Fuzzy matching for vendor names
- Business rule validation

### 3. Data Extraction & Validation

Key fields extracted:
- Invoice number, date, due date
- Vendor information (name, tax ID, address)
- Line items with descriptions and amounts
- Tax calculations (PPN, PPH)
- Total amounts

**Validation Rules:**
- Tax ID format validation (NPWP 15 digits)
- Date logic checks (invoice date ≤ current date)
- Math validation (subtotal + tax = total)
- Duplicate detection via hash comparison

### 4. Excel Export

Finally, structured data exports to Excel with:
- Auto-formatted columns
- Data validation rules
- Conditional formatting for errors
- Batch processing with progress tracking

## Technical Challenges & Solutions

### Challenge 1: Poor Image Quality
**Solution:** Implemented adaptive preprocessing with quality assessment. Low-quality images trigger additional enhancement steps.

### Challenge 2: Variable Document Layouts
**Solution:** Template-free extraction using spatial analysis and field relationship modeling instead of fixed coordinates.

### Challenge 3: Processing Speed
**Solution:**
- GPU acceleration for model inference
- Parallel processing with multiprocessing
- Redis queue for job management
- ~3 seconds per document average

### Challenge 4: Accuracy for Critical Fields
**Solution:**
- Ensemble of multiple OCR engines
- Human-in-the-loop for low confidence (<85%)
- Active learning to improve model over time

## Results & Impact

**Metrics:**
- **95% reduction** in processing time (from 15 min to ~45 sec per document)
- **98% accuracy** for data extraction
- **10,000+ documents** processed monthly
- **200+ hours** saved per month
- **ROI achieved** in 4 months

## Tech Stack Summary

**Backend:**
- Python 3.10
- FastAPI for REST API
- TensorFlow 2.12 for ML models
- OpenCV for image processing
- Tesseract OCR 5.0

**Processing:**
- Celery for async tasks
- Redis for caching & queuing
- PostgreSQL for data storage

**Deployment:**
- Docker containers
- AWS ECS for orchestration
- S3 for document storage
- CloudWatch for monitoring

## Key Learnings

1. **Pre-processing is critical:** 60% of accuracy comes from good image preparation
2. **Domain knowledge matters:** Understanding invoice structures helps model performance
3. **Confidence scores are essential:** Know when to escalate to humans
4. **Active learning pays off:** Continuous model improvement with production data
5. **Error handling is key:** Graceful degradation when OCR fails

## Future Enhancements

- Multi-language support expansion
- Real-time processing via webhooks
- Mobile app for document capture
- Blockchain integration for audit trails
- AI-powered anomaly detection

## Conclusion

Building DocScan AI taught me that successful AI integration requires more than just models - it needs robust engineering, domain expertise, and user-centric design. The 98% accuracy didn't come from a single breakthrough, but from dozens of small optimizations across the entire pipeline.

If you're building similar document processing systems, focus on:
- Excellent pre-processing
- Multiple validation layers
- Clear confidence thresholds
- Human escalation workflows
- Continuous improvement loops

**Want to discuss OCR or document AI?** Reach out - I'd love to share more technical details!
    `,
    category: 'AI & Machine Learning',
    tags: ['Python', 'TensorFlow', 'OCR', 'Computer Vision', 'FastAPI', 'Production'],
    publishedDate: '2024-11-20',
    readTime: '15 min read',
    featured: true,
  },
  {
    id: 'nextjs-15-app-router-migration',
    title: 'Migrating to Next.js 15 App Router: Real-World Lessons from Production',
    excerpt: 'Complete guide to migrating from Pages Router to App Router in Next.js 15, including performance wins, gotchas, and practical patterns from migrating 3 production apps.',
    content: `
# Migrating to Next.js 15 App Router: Real-World Lessons from Production

I recently migrated three production Next.js applications to the new App Router. Here's everything I learned, including the wins, pain points, and patterns that actually work.

## Why Migrate?

**Benefits I actually experienced:**
- **40% faster build times** with Turbopack
- **Better TypeScript support** with Server Components
- **Improved data fetching** patterns
- **Nested layouts** eliminate code duplication
- **Streaming & Suspense** for better UX

## Migration Strategy

### 1. Incremental Adoption
Don't migrate everything at once. The App Router coexists with Pages Router:

**Phase 1:** New features in /app
**Phase 2:** Migrate simple pages
**Phase 3:** Migrate complex pages with data fetching
**Phase 4:** Remove /pages directory

### 2. Understanding Server vs Client Components

**Default = Server Component**
- Runs on server only
- Can async/await directly
- No hooks (useState, useEffect)
- Smaller bundle size

**Client Component (use 'use client')**
- Interactive components
- Browser APIs
- React hooks
- Event handlers

**Pattern I use:**
- Server Components for layouts, static content
- Client Components for forms, interactive widgets
- Composition over conversion

### 3. Data Fetching Changes

**Before (Pages Router):**
\`\`\`typescript
export async function getServerSideProps() {
  const data = await fetch('api/data')
  return { props: { data } }
}
\`\`\`

**After (App Router):**
\`\`\`typescript
async function getData() {
  const res = await fetch('api/data', { cache: 'no-store' })
  return res.json()
}

export default async function Page() {
  const data = await getData()
  return <div>{data}</div>
}
\`\`\`

**Key differences:**
- Direct async/await in components
- More control over caching
- Automatic request deduplication
- Can be collocated with components

### 4. Layouts & Nested Routes

**Game changer:** Nested layouts

**Before:** Duplicate layout code in every page

**After:**
\`\`\`
app/
  layout.tsx          # Root layout
  dashboard/
    layout.tsx        # Dashboard layout
    page.tsx          # /dashboard
    settings/
      page.tsx        # /dashboard/settings
\`\`\`

**Each layout wraps its children and persists during navigation.**

### 5. Loading & Error States

**Built-in conventions:**

\`\`\`
app/
  dashboard/
    loading.tsx       # Automatic loading UI
    error.tsx         # Error boundary
    page.tsx          # Main content
\`\`\`

**loading.tsx:**
\`\`\`typescript
export default function Loading() {
  return <Skeleton />
}
\`\`\`

**error.tsx:**
\`\`\`typescript
'use client'
export default function Error({ error, reset }) {
  return (
    <div>
      <h2>Something went wrong!</h2>
      <button onClick={reset}>Try again</button>
    </div>
  )
}
\`\`\`

## Gotchas & Solutions

### Gotcha 1: "use client" Placement
**Problem:** Using hooks in Server Components

**Solution:**
- Create separate client component
- Import into server component
- Only mark interactive parts as client

### Gotcha 2: Cookies & Headers
**Problem:** Can't use headers/cookies in client components

**Solution:**
- Read in Server Component
- Pass as props to Client Component
- Or use middleware

### Gotcha 3: Third-party Libraries
**Problem:** Many libraries assume browser environment

**Solution:**
- Dynamic imports with { ssr: false }
- Wrap in 'use client' component
- Use next/dynamic for code splitting

### Gotcha 4: Metadata
**Problem:** Can't use Head component anymore

**Solution:**
- Use metadata export (Server Components)
- Use generateMetadata for dynamic metadata

\`\`\`typescript
export const metadata = {
  title: 'My Page',
  description: 'Page description',
}

// Or dynamic:
export async function generateMetadata({ params }) {
  const data = await getData(params.id)
  return { title: data.title }
}
\`\`\`

## Performance Wins

**Real metrics from production:**
- **Bundle size:** -35% (more Server Components)
- **FCP:** 1.2s → 0.8s (streaming)
- **TTI:** 2.8s → 1.9s (less JS)
- **Build time:** 180s → 108s (Turbopack)

## Migration Checklist

- [ ] Update to Next.js 15
- [ ] Create app/ directory
- [ ] Move simple static pages first
- [ ] Add layouts (root, then nested)
- [ ] Migrate data fetching
- [ ] Update imports and links
- [ ] Add loading/error states
- [ ] Convert metadata
- [ ] Test everything thoroughly
- [ ] Remove old pages/ directory

## Best Practices

**1. Composition Pattern**
\`\`\`typescript
// ❌ Don't: Make entire page client
'use client'
export default function Page() { ... }

// ✅ Do: Compose server + client
export default function Page() {
  return (
    <>
      <StaticHeader />
      <InteractiveForm />  // 'use client'
      <StaticFooter />
    </>
  )
}
\`\`\`

**2. Data Fetching Location**
- Fetch where you need it (component level)
- Next.js deduplicates automatically
- Use proper cache directives

**3. Streaming Strategy**
- Use Suspense boundaries strategically
- Don't wrap entire page
- Prioritize above-the-fold content

## Conclusion

The App Router is production-ready and worth migrating to. The mental model shift takes time, but the benefits are real:
- Better performance
- Cleaner code
- More flexible layouts
- Future-proof architecture

**Start incrementally, test thoroughly, and enjoy the improved DX!**
    `,
    category: 'Web Development',
    tags: ['Next.js', 'React', 'TypeScript', 'Migration', 'Performance'],
    publishedDate: '2024-11-18',
    readTime: '12 min read',
    featured: true,
  },
  {
    id: 'postgresql-optimization-techniques',
    title: 'PostgreSQL Query Optimization: From 8s to 80ms',
    excerpt: 'How I optimized slow PostgreSQL queries in a production ERP system, achieving 100x performance improvement through indexing, query rewriting, and proper database design.',
    content: `
# PostgreSQL Query Optimization: From 8s to 80ms

In our financial management system (Sianggar), we hit a wall when queries started taking 5-8 seconds. Users were frustrated. Here's how I optimized it to sub-100ms response times.

## The Problem Query

Original query was fetching budget data with approvals:

\`\`\`sql
SELECT
  b.*,
  u.name as creator_name,
  d.name as department_name,
  (SELECT COUNT(*) FROM approvals
   WHERE budget_id = b.id AND status = 'approved') as approval_count
FROM budgets b
LEFT JOIN users u ON b.created_by = u.id
LEFT JOIN departments d ON b.department_id = d.id
WHERE b.fiscal_year = 2024
  AND b.status IN ('pending', 'in_review', 'approved')
ORDER BY b.created_at DESC
LIMIT 50;
\`\`\`

**Execution time: 8,240ms** 😱

## Diagnosis with EXPLAIN ANALYZE

\`\`\`sql
EXPLAIN ANALYZE [query];
\`\`\`

**Issues found:**
- Sequential scan on budgets (250K rows)
- Correlated subquery executed 50 times
- No indexes on foreign keys
- Missing composite indexes

## Solution 1: Add Strategic Indexes

\`\`\`sql
-- Composite index for WHERE clause
CREATE INDEX idx_budgets_year_status
ON budgets(fiscal_year, status);

-- Include frequently selected columns
CREATE INDEX idx_budgets_year_status_created
ON budgets(fiscal_year, status)
INCLUDE (created_by, department_id, created_at);

-- Foreign key indexes
CREATE INDEX idx_budgets_created_by ON budgets(created_by);
CREATE INDEX idx_budgets_department_id ON budgets(department_id);

-- Approval optimization
CREATE INDEX idx_approvals_budget_status
ON approvals(budget_id, status);
\`\`\`

**Result: 8,240ms → 1,200ms** ✅ (7x faster)

## Solution 2: Eliminate Correlated Subquery

Replace with LEFT JOIN and GROUP BY:

\`\`\`sql
SELECT
  b.*,
  u.name as creator_name,
  d.name as department_name,
  COUNT(a.id) FILTER (WHERE a.status = 'approved') as approval_count
FROM budgets b
LEFT JOIN users u ON b.created_by = u.id
LEFT JOIN departments d ON b.department_id = d.id
LEFT JOIN approvals a ON a.budget_id = b.id
WHERE b.fiscal_year = 2024
  AND b.status IN ('pending', 'in_review', 'approved')
GROUP BY b.id, u.name, d.name
ORDER BY b.created_at DESC
LIMIT 50;
\`\`\`

**Result: 1,200ms → 180ms** ✅ (6x faster)

## Solution 3: Materialized View for Complex Aggregations

For dashboard queries that don't need real-time data:

\`\`\`sql
CREATE MATERIALIZED VIEW budget_summary AS
SELECT
  b.id,
  b.fiscal_year,
  b.department_id,
  b.status,
  b.total_amount,
  b.created_at,
  u.name as creator_name,
  d.name as department_name,
  COUNT(a.id) FILTER (WHERE a.status = 'approved') as approval_count,
  COUNT(a.id) FILTER (WHERE a.status = 'pending') as pending_approvals
FROM budgets b
LEFT JOIN users u ON b.created_by = u.id
LEFT JOIN departments d ON b.department_id = d.id
LEFT JOIN approvals a ON a.budget_id = b.id
GROUP BY b.id, u.name, d.name;

-- Index on materialized view
CREATE INDEX idx_budget_summary_year_status
ON budget_summary(fiscal_year, status);

-- Refresh strategy (CONCURRENTLY doesn't lock)
REFRESH MATERIALIZED VIEW CONCURRENTLY budget_summary;
\`\`\`

**Refresh via cron every 5 minutes or trigger on data changes**

**Result: 180ms → 25ms** ✅ (7x faster)

## Solution 4: Partial Indexes

Most queries filter recent data:

\`\`\`sql
-- Only index active budgets
CREATE INDEX idx_budgets_active
ON budgets(fiscal_year, status, created_at)
WHERE status IN ('pending', 'in_review', 'approved');

-- Only index current fiscal year
CREATE INDEX idx_budgets_current_year
ON budgets(department_id, status)
WHERE fiscal_year = EXTRACT(YEAR FROM CURRENT_DATE);
\`\`\`

**Benefits:**
- Smaller index size
- Faster writes
- Quicker scans

## Solution 5: Query Optimization Patterns

### Pattern 1: Use EXISTS instead of IN for subqueries

\`\`\`sql
-- ❌ Slower
WHERE budget_id IN (SELECT id FROM budgets WHERE ...)

-- ✅ Faster
WHERE EXISTS (SELECT 1 FROM budgets WHERE ... AND id = budget_id)
\`\`\`

### Pattern 2: Avoid SELECT *

\`\`\`sql
-- ❌ Retrieves unnecessary data
SELECT * FROM budgets

-- ✅ Select only needed columns
SELECT id, title, amount, status FROM budgets
\`\`\`

### Pattern 3: Use LIMIT early

\`\`\`sql
-- ❌ Processes all rows then limits
SELECT * FROM (
  SELECT * FROM big_table WHERE ...
) sub LIMIT 10;

-- ✅ Limit in inner query
SELECT * FROM (
  SELECT * FROM big_table WHERE ... LIMIT 10
) sub;
\`\`\`

## Solution 6: Connection Pooling

Using PgBouncer for connection management:

**Benefits:**
- Reduce connection overhead
- Handle connection spikes
- Query queuing

**Config:**
\`\`\`ini
[databases]
mydb = host=localhost dbname=sianggar

[pgbouncer]
pool_mode = transaction
max_client_conn = 100
default_pool_size = 20
\`\`\`

## Monitoring & Maintenance

### 1. Identify Slow Queries

\`\`\`sql
-- Enable logging
ALTER SYSTEM SET log_min_duration_statement = 1000; -- 1 second

-- View slow queries
SELECT query, calls, total_time, mean_time
FROM pg_stat_statements
ORDER BY mean_time DESC
LIMIT 20;
\`\`\`

### 2. Index Usage Statistics

\`\`\`sql
SELECT
  schemaname,
  tablename,
  indexname,
  idx_scan,
  idx_tup_read,
  idx_tup_fetch
FROM pg_stat_user_indexes
ORDER BY idx_scan ASC;
\`\`\`

**Drop unused indexes:**
\`\`\`sql
-- Find indexes never used
SELECT schemaname, tablename, indexname
FROM pg_stat_user_indexes
WHERE idx_scan = 0 AND indexname NOT LIKE '%_pkey';
\`\`\`

### 3. VACUUM & ANALYZE

\`\`\`sql
-- Regular maintenance
VACUUM ANALYZE budgets;

-- Auto-vacuum configuration
ALTER TABLE budgets SET (
  autovacuum_vacuum_scale_factor = 0.1,
  autovacuum_analyze_scale_factor = 0.05
);
\`\`\`

## Final Results

| Optimization | Time | Improvement |
|---|---|---|
| Original | 8,240ms | baseline |
| + Indexes | 1,200ms | 7x faster |
| + JOIN optimization | 180ms | 46x faster |
| + Materialized view | 25ms | 330x faster |
| + Partial indexes | 15ms | 550x faster |
| + Connection pooling | **12ms** | **687x faster** |

**From 8+ seconds to 12 milliseconds!**

## Key Takeaways

1. **EXPLAIN ANALYZE is your friend** - Always profile before optimizing
2. **Indexes are crucial** - But don't over-index
3. **Avoid correlated subqueries** - Use JOINs instead
4. **Materialize when appropriate** - For complex, infrequently changing data
5. **Monitor continuously** - Use pg_stat_statements
6. **Regular maintenance** - VACUUM, ANALYZE, index cleanup

## Tools I Use

- **pgAdmin 4** - GUI for development
- **pg_stat_statements** - Query performance tracking
- **PgBouncer** - Connection pooling
- **Grafana + Prometheus** - Monitoring dashboards
- **pgBadger** - Log analyzer

PostgreSQL is incredibly powerful when tuned correctly. These optimizations made our ERP system feel instant and handle 10x more users!
    `,
    category: 'Database',
    tags: ['PostgreSQL', 'Database', 'Performance', 'Optimization', 'SQL'],
    publishedDate: '2024-11-15',
    readTime: '18 min read',
    featured: true,
  },
  {
    id: 'typescript-advanced-patterns',
    title: 'Advanced TypeScript Patterns for Enterprise Applications',
    excerpt: 'Real-world TypeScript patterns I use in production: discriminated unions, branded types, builder pattern, and more for type-safe, maintainable code.',
    content: `
# Advanced TypeScript Patterns for Enterprise Applications

After building multiple enterprise systems in TypeScript, these are the patterns that consistently deliver value in production code.

## 1. Discriminated Unions for State Management

**Problem:** Handling different states without runtime errors

\`\`\`typescript
// ❌ Unsafe: Can't tell which fields are available
type ApiResponse = {
  loading: boolean
  data?: User[]
  error?: string
}

// ✅ Safe: Discriminated union
type ApiState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: User[] }
  | { status: 'error'; error: string }

function handleResponse(state: ApiState) {
  switch (state.status) {
    case 'idle':
      return <div>Click to load</div>
    case 'loading':
      return <Spinner />
    case 'success':
      return <UserList users={state.data} /> // data guaranteed exists
    case 'error':
      return <Error message={state.error} /> // error guaranteed exists
  }
}
\`\`\`

**Real usage in Sianggar approval workflow:**

\`\`\`typescript
type ApprovalStatus =
  | { type: 'draft'; canEdit: true }
  | { type: 'pending'; submittedAt: Date; submittedBy: string }
  | { type: 'approved'; approvedAt: Date; approvedBy: string; signature: string }
  | { type: 'rejected'; rejectedAt: Date; rejectedBy: string; reason: string }

function renderApproval(approval: ApprovalStatus) {
  // TypeScript ensures we handle all cases
  switch (approval.type) {
    case 'draft':
      return <EditButton enabled={approval.canEdit} />
    case 'pending':
      return <StatusBadge date={approval.submittedAt} by={approval.submittedBy} />
    case 'approved':
      return <Signature data={approval.signature} />
    case 'rejected':
      return <RejectionReason reason={approval.reason} />
  }
}
\`\`\`

## 2. Branded Types for Type Safety

**Problem:** Primitive types that should not be interchangeable

\`\`\`typescript
// ❌ Unsafe: Can pass userId where orderId expected
function getOrder(orderId: string) { ... }
function getUser(userId: string) { ... }

const id = "123"
getOrder(id) // Should this be allowed?
getUser(id)

// ✅ Safe: Branded types
type UserId = string & { readonly brand: unique symbol }
type OrderId = string & { readonly brand: unique symbol }

function toUserId(id: string): UserId {
  // Validation logic here
  return id as UserId
}

function toOrderId(id: string): OrderId {
  // Validation logic here
  return id as OrderId
}

function getOrder(orderId: OrderId) { ... }
function getUser(userId: UserId) { ... }

const userId = toUserId("user-123")
const orderId = toOrderId("order-456")

getOrder(orderId) // ✅ Works
getOrder(userId)  // ❌ Type error!
\`\`\`

**Real usage for tax IDs (NPWP):**

\`\`\`typescript
type NPWP = string & { readonly __brand: 'NPWP' }

function validateNPWP(value: string): NPWP {
  if (!/^\\d{15}$/.test(value)) {
    throw new Error('Invalid NPWP format')
  }
  return value as NPWP
}

interface Vendor {
  name: string
  npwp: NPWP  // Can't accidentally pass any string
}
\`\`\`

## 3. Builder Pattern with Fluent API

**Problem:** Complex object construction with many optional fields

\`\`\`typescript
class QueryBuilder<T> {
  private query: any = {}
  private sort: any = {}
  private pagination: any = {}

  where(field: keyof T, operator: string, value: any) {
    this.query[field as string] = { [operator]: value }
    return this
  }

  orderBy(field: keyof T, direction: 'asc' | 'desc' = 'asc') {
    this.sort[field as string] = direction
    return this
  }

  limit(count: number) {
    this.pagination.limit = count
    return this
  }

  skip(count: number) {
    this.pagination.skip = count
    return this
  }

  async execute(): Promise<T[]> {
    // Execute query
    return []
  }
}

// Usage
const budgets = await new QueryBuilder<Budget>()
  .where('fiscal_year', '=', 2024)
  .where('status', 'in', ['pending', 'approved'])
  .orderBy('created_at', 'desc')
  .limit(50)
  .execute()
\`\`\`

## 4. Conditional Types for API Response Handling

\`\`\`typescript
type ApiResponse<TData, TError = Error> =
  | { success: true; data: TData }
  | { success: false; error: TError }

type Unwrap<T> = T extends { success: true; data: infer U }
  ? U
  : never

async function fetchUser(id: string): Promise<ApiResponse<User>> {
  try {
    const response = await fetch(\`/api/users/\${id}\`)
    const data = await response.json()
    return { success: true, data }
  } catch (error) {
    return { success: false, error: error as Error }
  }
}

// Usage with type narrowing
const result = await fetchUser('123')
if (result.success) {
  // TypeScript knows result.data exists
  console.log(result.data.name)
} else {
  // TypeScript knows result.error exists
  console.error(result.error.message)
}
\`\`\`

## 5. Mapped Types for Form Validation

\`\`\`typescript
type ValidationRule<T> = {
  required?: boolean
  min?: T extends number ? number : never
  max?: T extends number ? number : never
  minLength?: T extends string ? number : never
  maxLength?: T extends string ? number : never
  pattern?: T extends string ? RegExp : never
  custom?: (value: T) => boolean | string
}

type ValidationSchema<T> = {
  [K in keyof T]?: ValidationRule<T[K]>
}

interface BudgetForm {
  title: string
  amount: number
  department: string
  description?: string
}

const budgetValidation: ValidationSchema<BudgetForm> = {
  title: {
    required: true,
    minLength: 3,
    maxLength: 100,
  },
  amount: {
    required: true,
    min: 0,
    max: 1000000000,
  },
  department: {
    required: true,
  },
  description: {
    maxLength: 500,
  },
}

function validate<T>(data: T, schema: ValidationSchema<T>): Record<keyof T, string | null> {
  const errors: any = {}

  for (const key in schema) {
    const rules = schema[key]
    const value = data[key]

    if (rules?.required && !value) {
      errors[key] = 'This field is required'
      continue
    }

    if (rules?.minLength && typeof value === 'string' && value.length < rules.minLength) {
      errors[key] = \`Minimum length is \${rules.minLength}\`
      continue
    }

    // ... more validations
  }

  return errors
}
\`\`\`

## 6. Generic Repository Pattern

\`\`\`typescript
interface BaseEntity {
  id: string
  created_at: Date
  updated_at: Date
}

class Repository<T extends BaseEntity> {
  constructor(private tableName: string) {}

  async findById(id: string): Promise<T | null> {
    // DB query
    return null
  }

  async findMany(filter: Partial<T>): Promise<T[]> {
    // DB query
    return []
  }

  async create(data: Omit<T, keyof BaseEntity>): Promise<T> {
    // DB insert
    return {} as T
  }

  async update(id: string, data: Partial<T>): Promise<T> {
    // DB update
    return {} as T
  }

  async delete(id: string): Promise<boolean> {
    // DB delete
    return true
  }
}

// Usage
interface Budget extends BaseEntity {
  title: string
  amount: number
  department_id: string
  status: 'draft' | 'pending' | 'approved'
}

class BudgetRepository extends Repository<Budget> {
  constructor() {
    super('budgets')
  }

  async findByDepartment(departmentId: string): Promise<Budget[]> {
    return this.findMany({ department_id: departmentId } as Partial<Budget>)
  }

  async findPending(): Promise<Budget[]> {
    return this.findMany({ status: 'pending' } as Partial<Budget>)
  }
}

const budgets = new BudgetRepository()
const pending = await budgets.findPending() // Fully typed!
\`\`\`

## 7. Utility Types for Props Transformation

\`\`\`typescript
// Extract subset of props
type Pick<T, K extends keyof T> = {
  [P in K]: T[P]
}

// Make all properties optional
type Partial<T> = {
  [P in keyof T]?: T[P]
}

// Make all properties required
type Required<T> = {
  [P in keyof T]-?: T[P]
}

// Make all properties readonly
type Readonly<T> = {
  readonly [P in keyof T]: T[P]
}

// Real usage
interface User {
  id: string
  name: string
  email: string
  password: string
  role: string
}

// Public user info (exclude password)
type PublicUser = Omit<User, 'password'>

// User creation (exclude id)
type CreateUserInput = Omit<User, 'id'>

// User update (all optional except id)
type UpdateUserInput = Pick<User, 'id'> & Partial<Omit<User, 'id'>>
\`\`\`

## 8. Type Guards for Runtime Safety

\`\`\`typescript
function isUser(value: unknown): value is User {
  return (
    typeof value === 'object' &&
    value !== null &&
    'id' in value &&
    'name' in value &&
    'email' in value
  )
}

function isArray<T>(
  value: unknown,
  itemGuard: (item: unknown) => item is T
): value is T[] {
  return Array.isArray(value) && value.every(itemGuard)
}

// Usage
const data: unknown = await fetchData()

if (isUser(data)) {
  // TypeScript knows data is User
  console.log(data.email)
}

if (isArray(data, isUser)) {
  // TypeScript knows data is User[]
  data.forEach(user => console.log(user.name))
}
\`\`\`

## Key Takeaways

1. **Discriminated Unions** - Safe state management without runtime errors
2. **Branded Types** - Prevent mixing incompatible primitive types
3. **Builder Pattern** - Fluent APIs for complex construction
4. **Conditional Types** - Generic utilities that adapt to input types
5. **Mapped Types** - Transform types systematically
6. **Generic Patterns** - Reusable, type-safe abstractions
7. **Type Guards** - Bridge runtime and compile-time safety

These patterns make TypeScript truly shine in enterprise applications. They catch bugs at compile time, improve code readability, and make refactoring safer.

**Want to dive deeper?** Check out the TypeScript handbook and experiment with these patterns in your own projects!
    `,
    category: 'TypeScript',
    tags: ['TypeScript', 'Design Patterns', 'Enterprise', 'Type Safety', 'Best Practices'],
    publishedDate: '2024-11-12',
    readTime: '20 min read',
    featured: false,
  },
  {
    id: 'react-performance-optimization',
    title: 'React Performance Optimization: Practical Techniques That Matter',
    excerpt: 'Move beyond useMemo and useCallback. Learn advanced React optimization techniques including code splitting, lazy loading, virtualization, and concurrent features.',
    content: `
# React Performance Optimization: Practical Techniques That Matter

Performance optimization in React goes far beyond just adding \`useMemo\` everywhere. Here are techniques I use to keep React apps fast.

## 1. Code Splitting with React.lazy

**Don't load what you don't need immediately**

\`\`\`typescript
// ❌ Loads all components upfront
import Dashboard from './Dashboard'
import Settings from './Settings'
import Reports from './Reports'

// ✅ Load components on demand
const Dashboard = lazy(() => import('./Dashboard'))
const Settings = lazy(() => import('./Settings'))
const Reports = lazy(() => import('./Reports'))

function App() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/reports" element={<Reports />} />
      </Routes>
    </Suspense>
  )
}
\`\`\`

**Result:** Initial bundle reduced by 60%

## 2. Virtualization for Long Lists

**Problem:** Rendering 10,000 items kills performance

\`\`\`typescript
import { FixedSizeList } from 'react-window'

function TransactionList({ transactions }: { transactions: Transaction[] }) {
  const Row = ({ index, style }: { index: number; style: React.CSSProperties }) => (
    <div style={style}>
      <TransactionItem transaction={transactions[index]} />
    </div>
  )

  return (
    <FixedSizeList
      height={600}
      itemCount={transactions.length}
      itemSize={80}
      width="100%"
    >
      {Row}
    </FixedSizeList>
  )
}
\`\`\`

**Result:** Renders only visible items (20-30) instead of all 10,000

**Libraries:**
- \`react-window\` - Lightweight
- \`react-virtualized\` - More features
- \`@tanstack/react-virtual\` - Headless, flexible

## 3. Optimize Re-renders with React.memo

**Don't just memo everything - measure first!**

\`\`\`typescript
// ❌ Unnecessary re-renders
function UserCard({ user }: { user: User }) {
  return <div>{user.name}</div>
}

// ✅ Memoized when parent re-renders
const UserCard = memo(function UserCard({ user }: { user: User }) {
  return <div>{user.name}</div>
}, (prevProps, nextProps) => {
  // Custom comparison
  return prevProps.user.id === nextProps.user.id
})
\`\`\`

**When to use memo:**
- Component is expensive to render
- Receives same props frequently
- Is in a list
- Has many children

**When NOT to use memo:**
- Props change frequently
- Component is cheap to render
- You haven't measured performance first

## 4. useMemo and useCallback (When They Actually Help)

\`\`\`typescript
function ExpensiveComponent({ data }: { data: number[] }) {
  // ✅ Expensive computation - memoize it
  const sortedData = useMemo(() => {
    console.log('Sorting...')
    return [...data].sort((a, b) => b - a)
  }, [data])

  // ✅ Callback passed to memoized child - memoize it
  const handleClick = useCallback((id: string) => {
    console.log('Clicked:', id)
  }, [])

  return (
    <div>
      {sortedData.map(item => (
        <MemoizedChild key={item} value={item} onClick={handleClick} />
      ))}
    </div>
  )
}

// ❌ Don't memoize everything
function BadExample() {
  // Useless memoization
  const data = useMemo(() => [1, 2, 3], [])
  const handler = useCallback(() => console.log('hi'), [])

  // These are premature optimization
}
\`\`\`

**Rule of thumb:**
- Use when you've measured a performance problem
- Use for referential equality in dependencies
- Don't use "just in case"

## 5. Debounce Expensive Operations

\`\`\`typescript
import { useDeferredValue, useState, useMemo } from 'react'

function SearchResults() {
  const [query, setQuery] = useState('')

  // ✅ Deferred value doesn't block input
  const deferredQuery = useDeferredValue(query)

  // Expensive filtering happens with deferred value
  const results = useMemo(() => {
    return expensiveSearch(deferredQuery)
  }, [deferredQuery])

  return (
    <>
      <input
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Search..."
      />
      <Results data={results} />
    </>
  )
}
\`\`\`

**Or use custom debounce:**

\`\`\`typescript
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => clearTimeout(handler)
  }, [value, delay])

  return debouncedValue
}

// Usage
const debouncedQuery = useDebounce(query, 300)
\`\`\`

## 6. Optimize Context to Prevent Cascade Re-renders

\`\`\`typescript
// ❌ Bad: All consumers re-render when anything changes
const AppContext = createContext({ user: null, theme: 'light', settings: {} })

// ✅ Good: Split contexts by concern
const UserContext = createContext(null)
const ThemeContext = createContext('light')
const SettingsContext = createContext({})

// ✅ Even better: Use state management library
// Zustand, Jotai, or Recoil for granular subscriptions
\`\`\`

**Context optimization pattern:**

\`\`\`typescript
function ProviderWithMemo({ children }) {
  const [user, setUser] = useState(null)
  const [theme, setTheme] = useState('light')

  // Memoize value object
  const userValue = useMemo(() => ({ user, setUser }), [user])
  const themeValue = useMemo(() => ({ theme, setTheme }), [theme])

  return (
    <UserContext.Provider value={userValue}>
      <ThemeContext.Provider value={themeValue}>
        {children}
      </ThemeContext.Provider>
    </UserContext.Provider>
  )
}
\`\`\`

## 7. Image Optimization

\`\`\`typescript
// Next.js Image component
import Image from 'next/image'

function ProductCard({ product }) {
  return (
    <Image
      src={product.image}
      alt={product.name}
      width={300}
      height={400}
      loading="lazy"
      placeholder="blur"
      blurDataURL={product.thumbnail}
    />
  )
}
\`\`\`

**Benefits:**
- Automatic WebP/AVIF conversion
- Responsive images
- Lazy loading
- Blur placeholder

## 8. Bundle Analysis

\`\`\`bash
# Analyze bundle size
npm run build
npx @next/bundle-analyzer
\`\`\`

**Look for:**
- Duplicate dependencies
- Large libraries (moment.js → date-fns)
- Unused code
- Unoptimized imports

\`\`\`typescript
// ❌ Imports entire library
import _ from 'lodash'

// ✅ Import only what you need
import debounce from 'lodash/debounce'

// ✅ Even better: Use native methods
const debounce = (fn, delay) => {
  let timeout
  return (...args) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => fn(...args), delay)
  }
}
\`\`\`

## 9. Concurrent Features (React 18+)

\`\`\`typescript
import { useTransition, useState } from 'react'

function TabContainer() {
  const [isPending, startTransition] = useTransition()
  const [tab, setTab] = useState('home')

  function selectTab(nextTab: string) {
    startTransition(() => {
      setTab(nextTab)
    })
  }

  return (
    <>
      <Tabs onChange={selectTab} />
      {isPending && <Spinner />}
      <TabContent tab={tab} />
    </>
  )
}
\`\`\`

**useTransition benefits:**
- Marks updates as non-urgent
- Keeps UI responsive during heavy renders
- Shows loading state automatically

## 10. React DevTools Profiler

**Measure before optimizing!**

1. Open React DevTools
2. Go to Profiler tab
3. Click record
4. Interact with app
5. Stop recording
6. Analyze flame graph

**Look for:**
- Components that render frequently
- Long render times
- Unnecessary cascading updates

## Real-World Example: Budget List Optimization

**Before:**
- 1000 budget items
- Re-renders entire list on filter
- 2-3 second lag when typing

**After optimizations:**

\`\`\`typescript
const BudgetList = memo(function BudgetList({ budgets, filter }: Props) {
  // Debounce filter
  const deferredFilter = useDeferredValue(filter)

  // Memoize filtered data
  const filteredBudgets = useMemo(() => {
    return budgets.filter(b =>
      b.title.toLowerCase().includes(deferredFilter.toLowerCase())
    )
  }, [budgets, deferredFilter])

  // Virtualize list
  return (
    <FixedSizeList
      height={600}
      itemCount={filteredBudgets.length}
      itemSize={80}
      width="100%"
    >
      {({ index, style }) => (
        <BudgetItem
          key={filteredBudgets[index].id}
          budget={filteredBudgets[index]}
          style={style}
        />
      )}
    </FixedSizeList>
  )
})

const BudgetItem = memo(function BudgetItem({ budget, style }: ItemProps) {
  return (
    <div style={style}>
      {/* Item content */}
    </div>
  )
})
\`\`\`

**Result:**
- Instant filter response
- Smooth scrolling
- 60fps performance
- Handles 10,000+ items

## Checklist

- [ ] Code split routes and heavy components
- [ ] Virtualize long lists (>100 items)
- [ ] Optimize images (next/image or similar)
- [ ] Profile with React DevTools
- [ ] Memoize expensive computations
- [ ] Debounce user input for searches
- [ ] Split context by concern
- [ ] Analyze bundle size
- [ ] Lazy load below-the-fold content
- [ ] Use production build for testing

## Conclusion

React performance optimization is about:
1. **Measure first** - Don't guess
2. **Optimize the right things** - Bundle size, waterfalls, long renders
3. **Use built-in tools** - Profiler, lazy, memo
4. **Think about architecture** - Code splitting, state management

Most apps don't need all of these techniques. Profile, find bottlenecks, then optimize strategically!
    `,
    category: 'Web Development',
    tags: ['React', 'Performance', 'Optimization', 'JavaScript', 'Frontend'],
    publishedDate: '2024-11-10',
    readTime: '16 min read',
    featured: false,
  },
  {
    id: 'docker-containerization-production',
    title: 'Docker Containerization: From Development to Production',
    excerpt: 'Complete guide to containerizing applications with Docker, including multi-stage builds, docker-compose orchestration, and production deployment strategies.',
    content: `
# Docker Containerization: From Development to Production

Docker has transformed how I deploy applications. Here's everything I've learned from containerizing 10+ production apps.

## Why Docker?

**Problems Docker solves:**
- "Works on my machine" syndrome
- Environment inconsistencies
- Complex dependency management
- Difficult scaling
- Lengthy onboarding for new developers

**Benefits I've experienced:**
- Consistent environments (dev = staging = production)
- Fast deployment (seconds vs minutes)
- Easy rollbacks
- Resource efficiency
- Simplified CI/CD

## Basic Dockerfile for Node.js App

\`\`\`dockerfile
# Bad: Single stage, large image
FROM node:18
WORKDIR /app
COPY . .
RUN npm install
CMD ["npm", "start"]
# Result: 1.2GB image 😱
\`\`\`

\`\`\`dockerfile
# Good: Multi-stage build
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
USER node
CMD ["node", "dist/index.js"]
# Result: 180MB image ✅ (85% smaller!)
\`\`\`

**Key optimizations:**
- Alpine Linux (smaller base)
- Multi-stage build (only production files)
- npm ci (faster, reproducible)
- .dockerignore (exclude unnecessary files)
- Run as non-root user (security)

## Docker Compose for Local Development

**Sianggar app with PostgreSQL + Redis:**

\`\`\`yaml
version: '3.8'

services:
  # Main application
  app:
    build:
      context: .
      dockerfile: Dockerfile.dev
    ports:
      - "3000:3000"
    volumes:
      - .:/app
      - /app/node_modules
    environment:
      - DATABASE_URL=postgresql://postgres:password@db:5432/sianggar
      - REDIS_URL=redis://redis:6379
    depends_on:
      - db
      - redis
    command: npm run dev

  # PostgreSQL database
  db:
    image: postgres:15-alpine
    ports:
      - "5432:5432"
    environment:
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=password
      - POSTGRES_DB=sianggar
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./init.sql:/docker-entrypoint-initdb.d/init.sql

  # Redis cache
  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data

  # pgAdmin for database management
  pgadmin:
    image: dpage/pgadmin4
    ports:
      - "5050:80"
    environment:
      - PGADMIN_DEFAULT_EMAIL=admin@admin.com
      - PGADMIN_DEFAULT_PASSWORD=admin

volumes:
  postgres_data:
  redis_data:
\`\`\`

**Usage:**
\`\`\`bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f app

# Execute commands in container
docker-compose exec app npm run migrate

# Stop all services
docker-compose down

# Rebuild after changes
docker-compose up --build
\`\`\`

## .dockerignore (Critical!)

\`\`\`
node_modules
npm-debug.log
.git
.gitignore
.env
.env.local
dist
build
coverage
.next
.DS_Store
*.md
.vscode
.idea
\`\`\`

**Impact:** Reduces build context from 500MB to 5MB!

## Production Dockerfile with Best Practices

**For Next.js app:**

\`\`\`dockerfile
FROM node:18-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

FROM node:18-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED 1
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
ENV PORT 3000

CMD ["node", "server.js"]
\`\`\`

## Docker Compose for Production

\`\`\`yaml
version: '3.8'

services:
  app:
    image: registry.digitalocean.com/adilabs/sianggar:latest
    restart: unless-stopped
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=\${DATABASE_URL}
      - REDIS_URL=\${REDIS_URL}
      - NODE_ENV=production
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000/api/health"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s
    logging:
      driver: "json-file"
      options:
        max-size: "10m"
        max-file: "3"
    deploy:
      resources:
        limits:
          cpus: '1'
          memory: 1G
        reservations:
          cpus: '0.5'
          memory: 512M

  nginx:
    image: nginx:alpine
    restart: unless-stopped
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf:ro
      - ./ssl:/etc/nginx/ssl:ro
    depends_on:
      - app
\`\`\`

## Health Checks

**Simple health endpoint:**

\`\`\`typescript
// app/api/health/route.ts
export async function GET() {
  try {
    // Check database
    await db.query('SELECT 1')

    // Check Redis
    await redis.ping()

    return Response.json({
      status: 'healthy',
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    return Response.json({
      status: 'unhealthy',
      error: error.message
    }, { status: 503 })
  }
}
\`\`\`

## Docker Registry & CI/CD

**GitHub Actions workflow:**

\`\`\`yaml
name: Build and Deploy

on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v2

      - name: Login to Registry
        uses: docker/login-action@v2
        with:
          registry: registry.digitalocean.com
          username: \${{ secrets.DOCKER_USERNAME }}
          password: \${{ secrets.DOCKER_PASSWORD }}

      - name: Build and push
        uses: docker/build-push-action@v4
        with:
          context: .
          push: true
          tags: |
            registry.digitalocean.com/adilabs/sianggar:latest
            registry.digitalocean.com/adilabs/sianggar:\${{ github.sha }}
          cache-from: type=registry,ref=registry.digitalocean.com/adilabs/sianggar:buildcache
          cache-to: type=registry,ref=registry.digitalocean.com/adilabs/sianggar:buildcache,mode=max

      - name: Deploy to server
        uses: appleboy/ssh-action@master
        with:
          host: \${{ secrets.SERVER_HOST }}
          username: \${{ secrets.SERVER_USER }}
          key: \${{ secrets.SSH_PRIVATE_KEY }}
          script: |
            cd /opt/sianggar
            docker-compose pull
            docker-compose up -d
            docker system prune -f
\`\`\`

## Docker Commands I Use Daily

\`\`\`bash
# Build image
docker build -t myapp:latest .

# Run container
docker run -d -p 3000:3000 --name myapp myapp:latest

# View logs
docker logs -f myapp

# Execute command in running container
docker exec -it myapp sh

# Stop and remove
docker stop myapp && docker rm myapp

# Clean up
docker system prune -a --volumes

# View container stats
docker stats

# Inspect container
docker inspect myapp

# Copy files from container
docker cp myapp:/app/logs ./logs
\`\`\`

## Troubleshooting Common Issues

### Issue 1: Build is slow
**Solution:**
- Use .dockerignore
- Layer caching (COPY package.json first)
- Multi-stage builds
- BuildKit (DOCKER_BUILDKIT=1)

### Issue 2: Image is too large
**Solution:**
- Alpine base images
- Multi-stage builds
- Remove dev dependencies
- Minimize layers

### Issue 3: Container exits immediately
**Solution:**
\`\`\`bash
# Check logs
docker logs container_name

# Run interactively
docker run -it myapp sh

# Check entry point
docker inspect myapp | grep -A 5 Entrypoint
\`\`\`

### Issue 4: Can't connect to database
**Solution:**
\`\`\`yaml
# Use service names in docker-compose
DATABASE_URL=postgresql://user:pass@db:5432/mydb
                                    ↑
                            service name, not localhost!
\`\`\`

## Production Deployment Strategy

**Zero-downtime deployment:**

\`\`\`bash
# 1. Build new image
docker build -t myapp:v2 .

# 2. Start new container
docker run -d -p 3001:3000 --name myapp-v2 myapp:v2

# 3. Health check
curl http://localhost:3001/health

# 4. Update load balancer to point to new container
# 5. Gracefully shutdown old container
docker stop myapp-v1

# 6. Remove old container
docker rm myapp-v1
\`\`\`

**Or use Docker Swarm/Kubernetes for automatic rolling updates.**

## Monitoring & Logging

**Docker stats in Grafana:**

\`\`\`yaml
# Add to docker-compose.yml
  cadvisor:
    image: gcr.io/cadvisor/cadvisor:latest
    volumes:
      - /:/rootfs:ro
      - /var/run:/var/run:ro
      - /sys:/sys:ro
      - /var/lib/docker/:/var/lib/docker:ro
    ports:
      - 8080:8080
\`\`\`

## Security Best Practices

1. **Never run as root**
\`\`\`dockerfile
USER node  # or create custom user
\`\`\`

2. **Scan images for vulnerabilities**
\`\`\`bash
docker scan myapp:latest
\`\`\`

3. **Use specific versions**
\`\`\`dockerfile
FROM node:18.17.0-alpine  # not just node:18
\`\`\`

4. **Secrets management**
\`\`\`bash
# Never in Dockerfile or docker-compose.yml
# Use Docker secrets or environment variables
docker run -e DATABASE_URL=\$DATABASE_URL myapp
\`\`\`

5. **Minimize attack surface**
\`\`\`dockerfile
# Remove unnecessary packages
RUN apk del build-dependencies
\`\`\`

## Real-World Example: DocScan AI

**Multi-service architecture:**

\`\`\`yaml
services:
  api:
    build: ./api
    image: docscan-api:latest
    environment:
      - CELERY_BROKER_URL=redis://redis:6379
    depends_on:
      - redis
      - postgres

  worker:
    build: ./api
    image: docscan-api:latest
    command: celery -A app.celery worker --loglevel=info
    depends_on:
      - redis
      - postgres
    deploy:
      replicas: 3

  redis:
    image: redis:7-alpine

  postgres:
    image: postgres:15-alpine

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
\`\`\`

## Key Takeaways

1. **Multi-stage builds** - Reduce image size by 80%+
2. **.dockerignore** - Faster builds, smaller context
3. **Docker Compose** - Local dev environment in minutes
4. **Health checks** - Automatic restart of unhealthy containers
5. **Layer caching** - Optimize build order for speed
6. **Security** - Non-root user, vulnerability scanning
7. **CI/CD integration** - Automated builds and deployments

Docker has become indispensable in my workflow. Master it, and deployment becomes trivial!
    `,
    category: 'DevOps',
    tags: ['Docker', 'Containerization', 'DevOps', 'Deployment', 'CI/CD'],
    publishedDate: '2024-11-08',
    readTime: '17 min read',
    featured: false,
  },
  {
    id: 'flutter-production-app-development',
    title: 'Flutter Production App Development: Lessons from Building PeopleTrack',
    excerpt: 'Building a production Flutter app with real-time GPS tracking, offline support, and complex state management. Practical patterns and performance optimizations.',
    content: `
# Flutter Production App Development: Lessons from Building PeopleTrack

PeopleTrack is a field service management app I built with Flutter. Here's everything I learned building a production mobile app with 1,000+ active users.

## Why Flutter?

**Reasons I chose Flutter:**
- Single codebase for iOS + Android
- Native performance (compiled to ARM)
- Beautiful UI out of the box
- Hot reload (instant feedback)
- Strong ecosystem

**Trade-offs:**
- Larger app size (~20MB base)
- Platform-specific features need bridges
- Less mature than React Native

## App Architecture: Clean Architecture + BLoC

\`\`\`
lib/
├── core/
│   ├── constants/
│   ├── errors/
│   ├── network/
│   └── utils/
├── features/
│   ├── auth/
│   │   ├── data/
│   │   │   ├── datasources/
│   │   │   ├── models/
│   │   │   └── repositories/
│   │   ├── domain/
│   │   │   ├── entities/
│   │   │   ├── repositories/
│   │   │   └── usecases/
│   │   └── presentation/
│   │       ├── bloc/
│   │       ├── pages/
│   │       └── widgets/
│   ├── tracking/
│   └── tasks/
└── main.dart
\`\`\`

**Why this structure:**
- Clear separation of concerns
- Testable (business logic isolated)
- Scalable (new features = new folders)
- Team-friendly (no conflicts)

## State Management with BLoC

**Authentication BLoC:**

\`\`\`dart
class AuthBloc extends Bloc<AuthEvent, AuthState> {
  final AuthRepository _authRepository;

  AuthBloc({required AuthRepository authRepository})
      : _authRepository = authRepository,
        super(AuthInitial()) {
    on<LoginRequested>(_onLoginRequested);
    on<LogoutRequested>(_onLogoutRequested);
    on<AuthCheckRequested>(_onAuthCheckRequested);
  }

  Future<void> _onLoginRequested(
    LoginRequested event,
    Emitter<AuthState> emit,
  ) async {
    emit(AuthLoading());
    try {
      final user = await _authRepository.login(
        email: event.email,
        password: event.password,
      );
      emit(AuthAuthenticated(user: user));
    } on AuthException catch (e) {
      emit(AuthError(message: e.message));
    }
  }

  Future<void> _onLogoutRequested(
    LogoutRequested event,
    Emitter<AuthState> emit,
  ) async {
    await _authRepository.logout();
    emit(AuthUnauthenticated());
  }

  Future<void> _onAuthCheckRequested(
    AuthCheckRequested event,
    Emitter<AuthState> emit,
  ) async {
    final user = await _authRepository.getCurrentUser();
    if (user != null) {
      emit(AuthAuthenticated(user: user));
    } else {
      emit(AuthUnauthenticated());
    }
  }
}
\`\`\`

**Usage in UI:**

\`\`\`dart
class LoginPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return BlocConsumer<AuthBloc, AuthState>(
      listener: (context, state) {
        if (state is AuthAuthenticated) {
          Navigator.pushReplacementNamed(context, '/home');
        } else if (state is AuthError) {
          ScaffoldMessenger.of(context).showSnackBar(
            SnackBar(content: Text(state.message)),
          );
        }
      },
      builder: (context, state) {
        if (state is AuthLoading) {
          return Center(child: CircularProgressIndicator());
        }
        return LoginForm();
      },
    );
  }
}
\`\`\`

## Real-Time GPS Tracking

**Challenge:** Track user location every 30 seconds, even when app is in background.

**Solution:**

\`\`\`dart
class LocationService {
  final Location _location = Location();
  StreamSubscription<LocationData>? _locationSubscription;

  Future<void> startTracking() async {
    // Request permissions
    bool serviceEnabled = await _location.serviceEnabled();
    if (!serviceEnabled) {
      serviceEnabled = await _location.requestService();
      if (!serviceEnabled) return;
    }

    PermissionStatus permission = await _location.hasPermission();
    if (permission == PermissionStatus.denied) {
      permission = await _location.requestPermission();
      if (permission != PermissionStatus.granted) return;
    }

    // Configure location updates
    await _location.changeSettings(
      accuracy: LocationAccuracy.high,
      interval: 30000, // 30 seconds
      distanceFilter: 10, // meters
    );

    // Enable background mode
    await _location.enableBackgroundMode(enable: true);

    // Start listening
    _locationSubscription = _location.onLocationChanged.listen(
      (LocationData currentLocation) {
        _handleLocationUpdate(currentLocation);
      },
    );
  }

  Future<void> _handleLocationUpdate(LocationData location) async {
    try {
      // Send to backend
      await _apiService.updateLocation(
        latitude: location.latitude!,
        longitude: location.longitude!,
        accuracy: location.accuracy!,
        timestamp: DateTime.now(),
      );

      // Save locally (for offline support)
      await _localDatabase.saveLocation(location);
    } catch (e) {
      print('Error updating location: \$e');
    }
  }

  void stopTracking() {
    _locationSubscription?.cancel();
    _location.enableBackgroundMode(enable: false);
  }
}
\`\`\`

**iOS Configuration (Info.plist):**
\`\`\`xml
<key>NSLocationWhenInUseUsageDescription</key>
<string>We need your location to track field visits</string>
<key>NSLocationAlwaysAndWhenInUseUsageDescription</key>
<string>We need your location to track field visits even when app is in background</string>
<key>UIBackgroundModes</key>
<array>
  <string>location</string>
</array>
\`\`\`

## Offline Support with Hive

**Local database for offline mode:**

\`\`\`dart
@HiveType(typeId: 0)
class Task extends HiveObject {
  @HiveField(0)
  String? id;

  @HiveField(1)
  String title;

  @HiveField(2)
  String? description;

  @HiveField(3)
  DateTime? dueDate;

  @HiveField(4)
  bool isCompleted;

  @HiveField(5)
  bool needsSync;

  Task({
    this.id,
    required this.title,
    this.description,
    this.dueDate,
    this.isCompleted = false,
    this.needsSync = false,
  });
}

class TaskRepository {
  final Box<Task> _taskBox;
  final ApiService _apiService;

  TaskRepository({
    required Box<Task> taskBox,
    required ApiService apiService,
  })  : _taskBox = taskBox,
        _apiService = apiService;

  Future<List<Task>> getTasks() async {
    // Try fetching from API
    try {
      final tasks = await _apiService.fetchTasks();

      // Update local database
      await _taskBox.clear();
      await _taskBox.addAll(tasks);

      return tasks;
    } catch (e) {
      // Offline: return from local database
      return _taskBox.values.toList();
    }
  }

  Future<void> createTask(Task task) async {
    // Save locally first
    await _taskBox.add(task);

    // Try syncing to backend
    try {
      final createdTask = await _apiService.createTask(task);
      task.id = createdTask.id;
      task.needsSync = false;
      await task.save();
    } catch (e) {
      // Mark for sync later
      task.needsSync = true;
      await task.save();
    }
  }

  Future<void> syncPendingTasks() async {
    final pendingTasks = _taskBox.values
        .where((task) => task.needsSync)
        .toList();

    for (final task in pendingTasks) {
      try {
        if (task.id == null) {
          // Create new task
          final createdTask = await _apiService.createTask(task);
          task.id = createdTask.id;
        } else {
          // Update existing task
          await _apiService.updateTask(task);
        }
        task.needsSync = false;
        await task.save();
      } catch (e) {
        print('Failed to sync task: \$e');
      }
    }
  }
}
\`\`\`

## Network Layer with Dio

\`\`\`dart
class ApiService {
  final Dio _dio;

  ApiService() : _dio = Dio() {
    _dio.options.baseUrl = 'https://api.peopletrack.com';
    _dio.options.connectTimeout = Duration(seconds: 10);
    _dio.options.receiveTimeout = Duration(seconds: 10);

    // Add interceptors
    _dio.interceptors.add(AuthInterceptor());
    _dio.interceptors.add(LoggerInterceptor());
    _dio.interceptors.add(RetryInterceptor());
  }

  Future<List<Task>> fetchTasks() async {
    try {
      final response = await _dio.get('/tasks');
      return (response.data as List)
          .map((json) => Task.fromJson(json))
          .toList();
    } on DioException catch (e) {
      throw _handleError(e);
    }
  }

  AppException _handleError(DioException error) {
    switch (error.type) {
      case DioExceptionType.connectionTimeout:
      case DioExceptionType.sendTimeout:
      case DioExceptionType.receiveTimeout:
        return NetworkException('Connection timeout');
      case DioExceptionType.badResponse:
        return ServerException('Server error: \${error.response?.statusCode}');
      case DioExceptionType.cancel:
        return CancelledException('Request cancelled');
      default:
        return NetworkException('Network error');
    }
  }
}
\`\`\`

## Performance Optimizations

### 1. Lazy Loading Lists

\`\`\`dart
class TaskListPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return ListView.builder(
      itemCount: tasks.length,
      itemBuilder: (context, index) {
        // Only build visible items
        return TaskCard(task: tasks[index]);
      },
    );
  }
}
\`\`\`

### 2. Image Caching

\`\`\`dart
CachedNetworkImage(
  imageUrl: task.imageUrl,
  placeholder: (context, url) => CircularProgressIndicator(),
  errorWidget: (context, url, error) => Icon(Icons.error),
  cacheKey: task.id,
  maxHeightDiskCache: 1000,
  maxWidthDiskCache: 1000,
)
\`\`\`

### 3. Debounce Search

\`\`\`dart
class SearchBloc extends Bloc<SearchEvent, SearchState> {
  Timer? _debounce;

  SearchBloc() : super(SearchInitial()) {
    on<SearchQueryChanged>((event, emit) {
      if (_debounce?.isActive ?? false) _debounce!.cancel();

      _debounce = Timer(Duration(milliseconds: 500), () {
        add(SearchExecuted(query: event.query));
      });
    });

    on<SearchExecuted>((event, emit) async {
      emit(SearchLoading());
      try {
        final results = await _searchRepository.search(event.query);
        emit(SearchLoaded(results: results));
      } catch (e) {
        emit(SearchError(message: e.toString()));
      }
    });
  }
}
\`\`\`

### 4. Const Constructors

\`\`\`dart
// Reuses widget instance
const AppBar(
  title: const Text('Tasks'),
  actions: const [
    const IconButton(
      icon: const Icon(Icons.search),
      onPressed: null,
    ),
  ],
)
\`\`\`

## Push Notifications with FCM

\`\`\`dart
class PushNotificationService {
  final FirebaseMessaging _fcm = FirebaseMessaging.instance;

  Future<void> initialize() async {
    // Request permission
    NotificationSettings settings = await _fcm.requestPermission(
      alert: true,
      badge: true,
      sound: true,
    );

    if (settings.authorizationStatus == AuthorizationStatus.authorized) {
      // Get FCM token
      String? token = await _fcm.getToken();
      print('FCM Token: \$token');

      // Send token to backend
      await _apiService.updateFcmToken(token!);

      // Handle foreground messages
      FirebaseMessaging.onMessage.listen((RemoteMessage message) {
        _showNotification(message);
      });

      // Handle background messages
      FirebaseMessaging.onBackgroundMessage(_backgroundHandler);

      // Handle notification tap
      FirebaseMessaging.onMessageOpenedApp.listen((RemoteMessage message) {
        _handleNotificationTap(message);
      });
    }
  }

  void _showNotification(RemoteMessage message) {
    // Show local notification
    FlutterLocalNotificationsPlugin().show(
      message.hashCode,
      message.notification?.title,
      message.notification?.body,
      NotificationDetails(/* ... */),
    );
  }
}
\`\`\`

## Testing

**Unit test:**
\`\`\`dart
void main() {
  group('TaskRepository', () {
    late TaskRepository repository;
    late MockApiService mockApi;
    late MockTaskBox mockBox;

    setUp(() {
      mockApi = MockApiService();
      mockBox = MockTaskBox();
      repository = TaskRepository(
        apiService: mockApi,
        taskBox: mockBox,
      );
    });

    test('getTasks returns tasks from API', () async {
      // Arrange
      final tasks = [Task(title: 'Task 1'), Task(title: 'Task 2')];
      when(mockApi.fetchTasks()).thenAnswer((_) async => tasks);

      // Act
      final result = await repository.getTasks();

      // Assert
      expect(result, tasks);
      verify(mockBox.clear()).called(1);
      verify(mockBox.addAll(tasks)).called(1);
    });
  });
}
\`\`\`

## App Size Optimization

**Before optimization:** 45MB
**After optimization:** 22MB

**Techniques:**
1. Remove unused resources
2. Use vector graphics (SVG)
3. Compress images
4. Enable ProGuard (Android)
5. Split APKs by ABI

\`\`\`yaml
# android/app/build.gradle
android {
    buildTypes {
        release {
            shrinkResources true
            minifyEnabled true
        }
    }

    splits {
        abi {
            enable true
            reset()
            include 'armeabi-v7a', 'arm64-v8a'
            universalApk false
        }
    }
}
\`\`\`

## Deployment

**Fastlane for automated releases:**

\`\`\`ruby
lane :beta do
  increment_build_number
  build_app(scheme: "Runner")
  upload_to_testflight(
    skip_waiting_for_build_processing: true
  )
end

lane :production do
  increment_build_number
  build_app(scheme: "Runner")
  upload_to_app_store(
    submit_for_review: true,
    automatic_release: false
  )
end
\`\`\`

## Key Lessons

1. **BLoC for state management** - Clean, testable, scalable
2. **Offline-first** - Hive for local storage
3. **Performance matters** - Lazy loading, caching, const widgets
4. **Background tasks** - WorkManager for periodic sync
5. **Testing is crucial** - Unit + Widget + Integration tests
6. **Native features** - Platform channels when needed
7. **App size** - Optimize from the start

Flutter enabled me to ship PeopleTrack to both platforms with a single codebase and team. Would absolutely use again!
    `,
    category: 'Mobile Development',
    tags: ['Flutter', 'Dart', 'Mobile', 'iOS', 'Android', 'BLoC'],
    publishedDate: '2024-11-05',
    readTime: '18 min read',
    featured: false,
  },
  {
    id: 'laravel-backend-patterns',
    title: 'Laravel Backend Architecture: Enterprise Patterns from Production',
    excerpt: 'Battle-tested patterns from building scalable Laravel backends. Learn repository pattern, service layer architecture, event-driven design, and API versioning strategies used in production systems.',
    content: `
When building **Sianggar ERP**, I needed Laravel to handle complex business logic, multiple user roles, and integrations with external systems. Here are the architectural patterns that made the codebase maintainable at scale.

## Why Architecture Matters

A typical Laravel app might start simple:

\`\`\`php
// Controller doing everything (bad)
class OrderController extends Controller
{
    public function store(Request $request)
    {
        // Validation
        $validated = $request->validate([...]);

        // Business logic
        $order = Order::create($validated);

        // Email notification
        Mail::to($order->customer)->send(new OrderCreated($order));

        // Update inventory
        foreach ($order->items as $item) {
            $product = Product::find($item->product_id);
            $product->decrement('stock', $item->quantity);
        }

        // Log activity
        ActivityLog::create([...]);

        return response()->json($order);
    }
}
\`\`\`

This works initially, but breaks down when you need:
- Unit testing without hitting the database
- Reusing business logic in artisan commands or jobs
- Different notification channels (email, SMS, Slack)
- Multiple order sources (web, mobile app, API)

## 1. Repository Pattern

Separate data access from business logic:

\`\`\`php
// app/Repositories/OrderRepository.php
interface OrderRepositoryInterface
{
    public function create(array $data): Order;
    public function findById(int $id): ?Order;
    public function getByCustomer(int $customerId): Collection;
}

class OrderRepository implements OrderRepositoryInterface
{
    public function create(array $data): Order
    {
        return Order::create($data);
    }

    public function findById(int $id): ?Order
    {
        return Order::with(['customer', 'items.product'])
            ->find($id);
    }

    public function getByCustomer(int $customerId): Collection
    {
        return Order::where('customer_id', $customerId)
            ->latest()
            ->get();
    }
}
\`\`\`

Register in service provider:

\`\`\`php
// app/Providers/RepositoryServiceProvider.php
class RepositoryServiceProvider extends ServiceProvider
{
    public function register()
    {
        $this->app->bind(
            OrderRepositoryInterface::class,
            OrderRepository::class
        );
    }
}
\`\`\`

Now you can swap implementations for testing or caching without changing business logic.

## 2. Service Layer Architecture

Extract business logic into dedicated services:

\`\`\`php
// app/Services/OrderService.php
class OrderService
{
    public function __construct(
        private OrderRepositoryInterface $orderRepo,
        private InventoryService $inventory,
        private NotificationService $notifications
    ) {}

    public function createOrder(array $data): Order
    {
        // Begin transaction
        return DB::transaction(function () use ($data) {
            // Create order
            $order = $this->orderRepo->create($data);

            // Reserve inventory
            foreach ($order->items as $item) {
                $this->inventory->reserve(
                    $item->product_id,
                    $item->quantity
                );
            }

            // Dispatch notifications
            $this->notifications->orderCreated($order);

            // Fire event for other listeners
            event(new OrderCreated($order));

            return $order;
        });
    }

    public function cancelOrder(int $orderId, string $reason): bool
    {
        $order = $this->orderRepo->findById($orderId);

        if (!$order->canBeCancelled()) {
            throw new OrderCannotBeCancelledException();
        }

        return DB::transaction(function () use ($order, $reason) {
            $order->update(['status' => 'cancelled', 'cancel_reason' => $reason]);

            // Return inventory
            foreach ($order->items as $item) {
                $this->inventory->release($item->product_id, $item->quantity);
            }

            // Notify customer
            $this->notifications->orderCancelled($order);

            return true;
        });
    }
}
\`\`\`

Controller becomes thin:

\`\`\`php
class OrderController extends Controller
{
    public function __construct(
        private OrderService $orderService
    ) {}

    public function store(OrderRequest $request)
    {
        $order = $this->orderService->createOrder(
            $request->validated()
        );

        return new OrderResource($order);
    }
}
\`\`\`

## 3. Event-Driven Architecture

Decouple side effects using Laravel events:

\`\`\`php
// app/Events/OrderCreated.php
class OrderCreated implements ShouldBroadcast
{
    use Dispatchable, SerializesModels;

    public function __construct(public Order $order) {}

    public function broadcastOn(): array
    {
        return [
            new PrivateChannel('orders.' . $this->order->customer_id),
        ];
    }
}

// app/Listeners/SendOrderConfirmationEmail.php
class SendOrderConfirmationEmail
{
    public function handle(OrderCreated $event): void
    {
        Mail::to($event->order->customer)
            ->queue(new OrderConfirmationMail($event->order));
    }
}

// app/Listeners/UpdateInventoryLevels.php
class UpdateInventoryLevels
{
    public function handle(OrderCreated $event): void
    {
        foreach ($event->order->items as $item) {
            // Update inventory
            // Check reorder points
            // Notify warehouse if low stock
        }
    }
}

// app/Listeners/LogOrderActivity.php
class LogOrderActivity
{
    public function handle(OrderCreated $event): void
    {
        activity()
            ->performedOn($event->order)
            ->causedBy($event->order->customer)
            ->log('Order created');
    }
}
\`\`\`

Register in EventServiceProvider:

\`\`\`php
protected $listen = [
    OrderCreated::class => [
        SendOrderConfirmationEmail::class,
        UpdateInventoryLevels::class,
        LogOrderActivity::class,
        NotifyWarehouse::class,
    ],
];
\`\`\`

Adding new functionality = adding new listener. No changes to core order logic!

## 4. API Versioning Strategy

Support multiple API versions simultaneously:

\`\`\`php
// routes/api.php
Route::prefix('v1')->group(function () {
    Route::apiResource('orders', V1\\OrderController::class);
});

Route::prefix('v2')->group(function () {
    Route::apiResource('orders', V2\\OrderController::class);
});

// app/Http/Controllers/Api/V1/OrderController.php
namespace App\\Http\\Controllers\\Api\\V1;

class OrderController extends Controller
{
    public function index()
    {
        return OrderResource::collection(
            Order::paginate()
        );
    }
}

// app/Http/Controllers/Api/V2/OrderController.php
namespace App\\Http\\Controllers\\Api\\V2;

class OrderController extends Controller
{
    // V2 uses different response structure
    public function index()
    {
        return OrderResourceV2::collection(
            Order::with(['customer', 'items'])->paginate()
        );
    }
}
\`\`\`

Use API Resources for version-specific formatting:

\`\`\`php
// app/Http/Resources/V1/OrderResource.php
class OrderResource extends JsonResource
{
    public function toArray($request): array
    {
        return [
            'id' => $this->id,
            'customer_id' => $this->customer_id,
            'total' => $this->total,
            'created_at' => $this->created_at->toIso8601String(),
        ];
    }
}

// app/Http/Resources/V2/OrderResource.php
class OrderResourceV2 extends JsonResource
{
    public function toArray($request): array
    {
        return [
            'id' => $this->id,
            'customer' => new CustomerResource($this->customer),
            'items' => OrderItemResource::collection($this->items),
            'totals' => [
                'subtotal' => $this->subtotal,
                'tax' => $this->tax,
                'total' => $this->total,
            ],
            'timestamps' => [
                'created' => $this->created_at->toIso8601String(),
                'updated' => $this->updated_at->toIso8601String(),
            ],
        ];
    }
}
\`\`\`

## 5. Form Request Validation

Centralize validation logic:

\`\`\`php
// app/Http/Requests/OrderRequest.php
class OrderRequest extends FormRequest
{
    public function authorize(): bool
    {
        // User can create orders for their own company
        return $this->user()->company_id === $this->input('company_id');
    }

    public function rules(): array
    {
        return [
            'customer_id' => 'required|exists:customers,id',
            'items' => 'required|array|min:1',
            'items.*.product_id' => 'required|exists:products,id',
            'items.*.quantity' => 'required|integer|min:1',
            'items.*.price' => 'required|numeric|min:0',
            'notes' => 'nullable|string|max:1000',
        ];
    }

    public function messages(): array
    {
        return [
            'items.*.product_id.exists' => 'Product :input does not exist',
            'items.*.quantity.min' => 'Quantity must be at least 1',
        ];
    }

    // Custom validation
    public function withValidator($validator)
    {
        $validator->after(function ($validator) {
            if ($this->itemsExceedStock()) {
                $validator->errors()->add(
                    'items',
                    'Some items exceed available stock'
                );
            }
        });
    }

    private function itemsExceedStock(): bool
    {
        foreach ($this->items as $item) {
            $product = Product::find($item['product_id']);
            if ($product->stock < $item['quantity']) {
                return true;
            }
        }
        return false;
    }
}
\`\`\`

## 6. Query Optimization with Eager Loading

N+1 problem is the most common Laravel performance issue:

\`\`\`php
// Bad - N+1 queries
$orders = Order::all();
foreach ($orders as $order) {
    echo $order->customer->name; // Query per order!
}

// Good - 2 queries total
$orders = Order::with('customer')->get();
foreach ($orders as $order) {
    echo $order->customer->name;
}

// Even better - nested eager loading
$orders = Order::with([
    'customer',
    'items.product',
    'items.product.category',
])->get();
\`\`\`

Use scopes for reusable query logic:

\`\`\`php
// app/Models/Order.php
class Order extends Model
{
    public function scopeWithFullDetails($query)
    {
        return $query->with([
            'customer',
            'items.product.category',
            'payments',
            'shipments',
        ]);
    }

    public function scopePending($query)
    {
        return $query->where('status', 'pending');
    }

    public function scopeForCompany($query, int $companyId)
    {
        return $query->where('company_id', $companyId);
    }
}

// Usage
$orders = Order::withFullDetails()
    ->forCompany(auth()->user()->company_id)
    ->pending()
    ->get();
\`\`\`

## 7. Job Queues for Heavy Tasks

Never block HTTP requests:

\`\`\`php
// app/Jobs/GenerateInvoicePdf.php
class GenerateInvoicePdf implements ShouldQueue
{
    use Dispatchable, Queueable, SerializesModels;

    public function __construct(public Order $order) {}

    public function handle(InvoiceGenerator $generator): void
    {
        $pdf = $generator->generate($this->order);

        Storage::put(
            "invoices/{$this->order->id}.pdf",
            $pdf->output()
        );

        $this->order->update(['invoice_generated_at' => now()]);

        // Notify customer
        Mail::to($this->order->customer)
            ->send(new InvoiceReady($this->order));
    }
}

// Dispatch from controller
public function generateInvoice(Order $order)
{
    GenerateInvoicePdf::dispatch($order);

    return response()->json([
        'message' => 'Invoice generation started',
    ]);
}
\`\`\`

## Real-World Impact

In **Sianggar ERP**:
- **Repository pattern** enabled switching from MySQL to PostgreSQL with minimal changes
- **Service layer** made business logic reusable across web, API, and CLI
- **Events** allowed adding new features without touching core code
- **API versioning** let us release v2 while supporting legacy mobile apps
- **Queue jobs** reduced order processing from 3-5s to 200ms response time

## Key Takeaways

1. **Start with structure** - Repositories and services from day one
2. **Use events liberally** - They enable flexible, decoupled architecture
3. **Version your API** - You'll need it eventually
4. **Validate in FormRequests** - Keep controllers thin
5. **Always eager load** - N+1 queries kill performance
6. **Queue heavy work** - Never block HTTP responses
7. **Test at service layer** - Easier than testing controllers

Laravel's flexibility is both its strength and weakness. These patterns provide guardrails for building maintainable applications that scale.
    `,
    category: 'Backend Development',
    tags: ['Laravel', 'PHP', 'Backend', 'Architecture', 'Design Patterns'],
    publishedDate: '2024-10-28',
    readTime: '19 min read',
    featured: false,
  },
  {
    id: 'nodejs-scalable-architecture',
    title: 'Node.js Architecture: Building Scalable Backend Services',
    excerpt: 'From monolith to microservices: architectural patterns for building production-grade Node.js backends. Learn Express best practices, error handling, testing strategies, and performance optimization.',
    content: `
Building scalable Node.js backends requires more than just knowing Express. Here's what I learned building APIs that handle thousands of requests per second.

## Why Node.js Architecture Matters

A typical Express app starts like this:

\`\`\`javascript
// Bad - everything in one file
const express = require('express');
const app = express();

app.post('/api/orders', async (req, res) => {
  try {
    const order = await db.query('INSERT INTO orders...');
    await db.query('UPDATE inventory...');
    await sendEmail(order);
    await logActivity(order);
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000);
\`\`\`

This approach collapses under real-world requirements:
- Unit testing requires mocking the database
- Error handling is inconsistent
- Business logic can't be reused
- No request validation
- Difficult to maintain and debug

## 1. Project Structure

Organize by feature, not by type:

\`\`\`
src/
├── api/
│   ├── orders/
│   │   ├── order.controller.js
│   │   ├── order.service.js
│   │   ├── order.repository.js
│   │   ├── order.validator.js
│   │   ├── order.model.js
│   │   └── order.routes.js
│   ├── products/
│   ├── users/
│   └── index.js
├── config/
│   ├── database.js
│   ├── environment.js
│   └── logger.js
├── middleware/
│   ├── auth.js
│   ├── errorHandler.js
│   └── validation.js
├── utils/
│   ├── asyncHandler.js
│   └── ApiError.js
├── app.js
└── server.js
\`\`\`

## 2. Layered Architecture

Separate concerns into distinct layers:

\`\`\`javascript
// src/api/orders/order.routes.js
const express = require('express');
const router = express.Router();
const controller = require('./order.controller');
const { validate } = require('../../middleware/validation');
const { orderSchema } = require('./order.validator');

router.post('/', validate(orderSchema), controller.createOrder);
router.get('/:id', controller.getOrder);

module.exports = router;

// src/api/orders/order.controller.js
const orderService = require('./order.service');
const asyncHandler = require('../../utils/asyncHandler');

exports.createOrder = asyncHandler(async (req, res) => {
  const order = await orderService.createOrder(req.body, req.user);

  res.status(201).json({
    success: true,
    data: order,
  });
});

exports.getOrder = asyncHandler(async (req, res) => {
  const order = await orderService.getOrderById(req.params.id, req.user);

  res.json({
    success: true,
    data: order,
  });
});

// src/api/orders/order.service.js
const orderRepository = require('./order.repository');
const inventoryService = require('../inventory/inventory.service');
const emailService = require('../../services/email.service');
const ApiError = require('../../utils/ApiError');

exports.createOrder = async (orderData, user) => {
  // Check inventory availability
  for (const item of orderData.items) {
    const available = await inventoryService.checkAvailability(
      item.productId,
      item.quantity
    );

    if (!available) {
      throw new ApiError(400, \`Product \${item.productId} is out of stock\`);
    }
  }

  // Create order
  const order = await orderRepository.create({
    ...orderData,
    userId: user.id,
    status: 'pending',
  });

  // Reserve inventory
  await inventoryService.reserveItems(order.items);

  // Send confirmation email (async, don't wait)
  emailService.sendOrderConfirmation(order).catch(err => {
    logger.error('Failed to send order confirmation:', err);
  });

  return order;
};

exports.getOrderById = async (orderId, user) => {
  const order = await orderRepository.findById(orderId);

  if (!order) {
    throw new ApiError(404, 'Order not found');
  }

  // Authorization check
  if (order.userId !== user.id && !user.isAdmin) {
    throw new ApiError(403, 'Access denied');
  }

  return order;
};

// src/api/orders/order.repository.js
const db = require('../../config/database');

exports.create = async (orderData) => {
  const client = await db.pool.connect();

  try {
    await client.query('BEGIN');

    // Insert order
    const orderResult = await client.query(
      'INSERT INTO orders (user_id, status, total) VALUES ($1, $2, $3) RETURNING *',
      [orderData.userId, orderData.status, orderData.total]
    );

    const order = orderResult.rows[0];

    // Insert order items
    for (const item of orderData.items) {
      await client.query(
        'INSERT INTO order_items (order_id, product_id, quantity, price) VALUES ($1, $2, $3, $4)',
        [order.id, item.productId, item.quantity, item.price]
      );
    }

    await client.query('COMMIT');

    return order;
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
};

exports.findById = async (orderId) => {
  const result = await db.query(
    'SELECT * FROM orders WHERE id = $1',
    [orderId]
  );

  return result.rows[0];
};
\`\`\`

## 3. Error Handling

Centralized error handling with custom error class:

\`\`\`javascript
// src/utils/ApiError.js
class ApiError extends Error {
  constructor(statusCode, message, isOperational = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = ApiError;

// src/utils/asyncHandler.js
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports = asyncHandler;

// src/middleware/errorHandler.js
const logger = require('../config/logger');
const ApiError = require('../utils/ApiError');

const errorHandler = (err, req, res, next) => {
  let { statusCode, message } = err;

  // Handle specific error types
  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = Object.values(err.errors).map(e => e.message).join(', ');
  } else if (err.code === '23505') { // PostgreSQL unique violation
    statusCode = 409;
    message = 'Resource already exists';
  }

  // Log error
  logger.error({
    message: err.message,
    stack: err.stack,
    statusCode,
    url: req.originalUrl,
    method: req.method,
  });

  // Send response
  res.status(statusCode || 500).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};

module.exports = errorHandler;
\`\`\`

## 4. Request Validation

Use Joi for schema validation:

\`\`\`javascript
// src/api/orders/order.validator.js
const Joi = require('joi');

exports.orderSchema = Joi.object({
  items: Joi.array().items(
    Joi.object({
      productId: Joi.number().integer().positive().required(),
      quantity: Joi.number().integer().min(1).required(),
      price: Joi.number().positive().required(),
    })
  ).min(1).required(),
  shippingAddress: Joi.object({
    street: Joi.string().required(),
    city: Joi.string().required(),
    zipCode: Joi.string().required(),
    country: Joi.string().required(),
  }).required(),
  notes: Joi.string().max(500).optional(),
});

// src/middleware/validation.js
const ApiError = require('../utils/ApiError');

exports.validate = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      const message = error.details.map(detail => detail.message).join(', ');
      return next(new ApiError(400, message));
    }

    req.body = value;
    next();
  };
};
\`\`\`

## 5. Database Connection Pooling

Properly manage database connections:

\`\`\`javascript
// src/config/database.js
const { Pool } = require('pg');
const logger = require('./logger');

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  max: 20, // Maximum pool size
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

pool.on('error', (err, client) => {
  logger.error('Unexpected error on idle client', err);
  process.exit(-1);
});

pool.on('connect', () => {
  logger.info('Database connection established');
});

module.exports = {
  pool,
  query: (text, params) => pool.query(text, params),
};
\`\`\`

## 6. Testing Strategy

Test at multiple levels:

\`\`\`javascript
// tests/unit/order.service.test.js
const orderService = require('../../src/api/orders/order.service');
const orderRepository = require('../../src/api/orders/order.repository');
const inventoryService = require('../../src/api/inventory/inventory.service');

jest.mock('../../src/api/orders/order.repository');
jest.mock('../../src/api/inventory/inventory.service');

describe('Order Service', () => {
  describe('createOrder', () => {
    it('should create order when inventory is available', async () => {
      const orderData = {
        items: [{ productId: 1, quantity: 2, price: 100 }],
      };
      const user = { id: 1 };

      inventoryService.checkAvailability.mockResolvedValue(true);
      orderRepository.create.mockResolvedValue({ id: 1, ...orderData });

      const result = await orderService.createOrder(orderData, user);

      expect(result.id).toBe(1);
      expect(inventoryService.reserveItems).toHaveBeenCalled();
    });

    it('should throw error when inventory is unavailable', async () => {
      const orderData = {
        items: [{ productId: 1, quantity: 2, price: 100 }],
      };
      const user = { id: 1 };

      inventoryService.checkAvailability.mockResolvedValue(false);

      await expect(
        orderService.createOrder(orderData, user)
      ).rejects.toThrow('out of stock');
    });
  });
});

// tests/integration/order.routes.test.js
const request = require('supertest');
const app = require('../../src/app');

describe('POST /api/orders', () => {
  it('should create order with valid data', async () => {
    const response = await request(app)
      .post('/api/orders')
      .set('Authorization', \`Bearer \${authToken}\`)
      .send({
        items: [{ productId: 1, quantity: 2, price: 100 }],
        shippingAddress: {
          street: '123 Main St',
          city: 'Batam',
          zipCode: '29432',
          country: 'Indonesia',
        },
      });

    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.data).toHaveProperty('id');
  });

  it('should return 400 with invalid data', async () => {
    const response = await request(app)
      .post('/api/orders')
      .set('Authorization', \`Bearer \${authToken}\`)
      .send({
        items: [], // Invalid - empty items
      });

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
  });
});
\`\`\`

## 7. Performance Optimization

Use caching and query optimization:

\`\`\`javascript
// src/services/cache.service.js
const Redis = require('ioredis');
const redis = new Redis(process.env.REDIS_URL);

exports.get = async (key) => {
  const value = await redis.get(key);
  return value ? JSON.parse(value) : null;
};

exports.set = async (key, value, ttl = 3600) => {
  await redis.setex(key, ttl, JSON.stringify(value));
};

exports.del = async (key) => {
  await redis.del(key);
};

// Usage in service
const cacheService = require('../../services/cache.service');

exports.getProductById = async (productId) => {
  // Try cache first
  const cacheKey = \`product:\${productId}\`;
  const cached = await cacheService.get(cacheKey);

  if (cached) {
    return cached;
  }

  // Cache miss - fetch from database
  const product = await productRepository.findById(productId);

  if (product) {
    await cacheService.set(cacheKey, product, 3600); // 1 hour
  }

  return product;
};
\`\`\`

## Real-World Results

Using these patterns in production:
- **Response time**: Average 50ms, p95 < 200ms
- **Error rate**: < 0.1% with proper error handling
- **Test coverage**: 85%+ with fast unit tests
- **Scalability**: Horizontal scaling with PM2 cluster mode
- **Maintainability**: New developers onboard in days, not weeks

## Key Takeaways

1. **Layer your architecture** - Controllers → Services → Repositories
2. **Handle errors centrally** - Custom error class + middleware
3. **Validate everything** - Use Joi for request validation
4. **Pool database connections** - Never create connections per request
5. **Test at multiple levels** - Unit tests (fast) + Integration tests (confidence)
6. **Cache aggressively** - Redis for frequently accessed data
7. **Structure by feature** - Co-locate related code

Node.js gives you freedom. These patterns provide structure to build maintainable, scalable backend services.
    `,
    category: 'Backend Development',
    tags: ['Node.js', 'Express', 'Backend', 'Architecture', 'JavaScript'],
    publishedDate: '2024-10-20',
    readTime: '20 min read',
    featured: false,
  },
  {
    id: 'git-workflows-team-collaboration',
    title: 'Git Workflows for Team Collaboration: From Chaos to Control',
    excerpt: 'Master Git workflows that scale from small teams to large organizations. Learn branching strategies, code review processes, conflict resolution, and automation with Git hooks and CI/CD integration.',
    content: `
Good Git workflow isn't just about knowing commands—it's about enabling teams to collaborate without stepping on each other's toes. Here's what works in practice.

## Why Git Workflow Matters

I've seen teams struggle with:
- Merge conflicts that take hours to resolve
- Breaking changes pushed to production
- Lost work due to force pushes
- Unclear code review processes
- Messy commit history that makes debugging impossible

A solid Git workflow prevents these issues before they happen.

## 1. Git Flow: For Structured Releases

Used this for **Sianggar ERP** with monthly release cycles:

\`\`\`bash
# Branch structure
main          # Production-ready code
develop       # Integration branch
feature/*     # New features
release/*     # Release preparation
hotfix/*      # Emergency production fixes
\`\`\`

**Feature development workflow:**

\`\`\`bash
# Start new feature
git checkout develop
git pull origin develop
git checkout -b feature/add-inventory-module

# Make changes, commit frequently
git add .
git commit -m "feat: add inventory model and schema"
git commit -m "feat: add inventory CRUD endpoints"
git commit -m "test: add inventory service tests"

# Keep up to date with develop
git fetch origin
git rebase origin/develop

# Push feature branch
git push origin feature/add-inventory-module

# Create Pull Request on GitHub/GitLab
# After code review and approval, merge to develop
\`\`\`

**Release workflow:**

\`\`\`bash
# When ready to release, create release branch
git checkout develop
git pull origin develop
git checkout -b release/1.5.0

# Bump version, update changelog
npm version minor
git add package.json CHANGELOG.md
git commit -m "chore: bump version to 1.5.0"

# Final testing on release branch
# Fix bugs directly on release branch
git commit -m "fix: correct inventory count calculation"

# Merge to main and develop
git checkout main
git merge release/1.5.0
git tag v1.5.0
git push origin main --tags

git checkout develop
git merge release/1.5.0
git push origin develop

# Delete release branch
git branch -d release/1.5.0
\`\`\`

**Hotfix workflow:**

\`\`\`bash
# Critical bug in production!
git checkout main
git pull origin main
git checkout -b hotfix/fix-payment-error

# Fix the bug
git commit -m "fix: prevent duplicate payment processing"

# Merge to main
git checkout main
git merge hotfix/fix-payment-error
git tag v1.5.1
git push origin main --tags

# Also merge to develop
git checkout develop
git merge hotfix/fix-payment-error
git push origin develop

# Delete hotfix branch
git branch -d hotfix/fix-payment-error
\`\`\`

**Pros:**
- Clear separation of features, releases, and hotfixes
- Main branch always reflects production
- Structured release process

**Cons:**
- Complex for small teams
- Many long-lived branches

## 2. GitHub Flow: For Continuous Deployment

Used this for **DocScan AI** with continuous deployment:

\`\`\`bash
# Simple branch structure
main          # Always deployable
feature/*     # Short-lived feature branches
\`\`\`

**Workflow:**

\`\`\`bash
# Create feature branch from main
git checkout main
git pull origin main
git checkout -b feature/improve-ocr-accuracy

# Work in small commits
git commit -m "feat: add image preprocessing step"
git commit -m "feat: integrate new OCR model"
git commit -m "test: add accuracy tests"

# Push and create PR
git push origin feature/improve-ocr-accuracy

# After review, merge to main (via GitHub)
# CI/CD automatically deploys to production

# Delete feature branch
git branch -d feature/improve-ocr-accuracy
git push origin --delete feature/improve-ocr-accuracy
\`\`\`

**Pros:**
- Simple and easy to understand
- Fast integration
- Works great with CI/CD

**Cons:**
- Requires good automated testing
- No staging environment workflow

## 3. Trunk-Based Development: For High-Velocity Teams

Used this pattern for rapid development phases:

\`\`\`bash
# Everyone commits to main (or trunk)
# Use feature flags for incomplete work

# Short-lived feature branches (< 1 day)
git checkout -b short-feature
# Make small change
git commit -m "feat: add export button"
git push origin short-feature
# Immediate PR and merge

# Use feature flags for larger features
git commit -m "feat: add new dashboard (behind feature flag)"
\`\`\`

**Feature flag example:**

\`\`\`javascript
// Environment variable or config
const features = {
  newDashboard: process.env.FEATURE_NEW_DASHBOARD === 'true',
};

// In code
if (features.newDashboard) {
  return <NewDashboard />;
} else {
  return <OldDashboard />;
}
\`\`\`

**Pros:**
- Minimal merge conflicts
- Fast integration
- Simple mental model

**Cons:**
- Requires discipline
- Needs feature flags for incomplete work
- Demands excellent CI/CD

## 4. Commit Message Convention

Use Conventional Commits for clear history:

\`\`\`bash
# Format: <type>(<scope>): <subject>

# Types:
feat:     # New feature
fix:      # Bug fix
docs:     # Documentation
style:    # Formatting, missing semicolons
refactor: # Code restructuring
test:     # Adding tests
chore:    # Maintenance tasks

# Examples
git commit -m "feat(orders): add bulk order creation"
git commit -m "fix(auth): prevent token expiration error"
git commit -m "docs(api): update authentication endpoints"
git commit -m "refactor(database): optimize query performance"
git commit -m "test(orders): add integration tests"
git commit -m "chore(deps): update dependencies"

# With body and footer
git commit -m "feat(payments): integrate Stripe payment gateway

Add Stripe payment processing for credit card payments.
Includes webhook handling for payment status updates.

Closes #123"
\`\`\`

**Benefits:**
- Automatic changelog generation
- Easy to understand history
- Semantic versioning automation

## 5. Code Review Process

Effective pull request workflow:

\`\`\`bash
# 1. Create descriptive PR
# Title: feat(inventory): add low stock alerts
# Description:
# - Sends email when stock falls below threshold
# - Configurable alert levels per product
# - Includes admin dashboard alerts
#
# Testing: Manual testing with test products
# Screenshots: [attached]

# 2. Self-review before requesting review
git diff main...feature/low-stock-alerts

# 3. Address review comments
git commit -m "refactor: extract email logic to service"
git push origin feature/low-stock-alerts

# 4. Keep PR up to date
git fetch origin
git rebase origin/main
git push --force-with-lease origin feature/low-stock-alerts

# 5. Squash commits before merging (optional)
git rebase -i origin/main
# Mark commits as 'squash' or 'fixup'
git push --force-with-lease origin feature/low-stock-alerts
\`\`\`

**PR Review Checklist:**
- [ ] Code follows project style guide
- [ ] Tests added/updated
- [ ] Documentation updated
- [ ] No unnecessary dependencies
- [ ] Breaking changes documented
- [ ] Security considerations reviewed

## 6. Handling Merge Conflicts

Resolving conflicts systematically:

\`\`\`bash
# Update your feature branch
git checkout feature/my-feature
git fetch origin
git rebase origin/main

# If conflicts occur
# Git will show conflicted files:
# CONFLICT (content): Merge conflict in src/order.service.js

# Open conflicted file and look for markers
<<<<<<< HEAD
// Your changes
const total = calculateTotal(items);
=======
// Their changes
const total = computeOrderTotal(items);
>>>>>>> origin/main

# Resolve by choosing correct code
const total = calculateTotal(items); // Keep your version
# OR
const total = computeOrderTotal(items); // Keep their version
# OR
const total = this.calculateOrderTotal(items); // Combine both

# Mark as resolved
git add src/order.service.js

# Continue rebase
git rebase --continue

# If you mess up
git rebase --abort  # Start over

# Push resolved changes
git push --force-with-lease origin feature/my-feature
\`\`\`

**Avoiding conflicts:**
- Pull/rebase frequently
- Keep feature branches short-lived
- Communicate with team about overlapping work
- Break large changes into smaller PRs

## 7. Git Hooks for Quality

Automate checks with Git hooks:

\`\`\`bash
# .git/hooks/pre-commit
#!/bin/sh

# Run linter
npm run lint
if [ $? -ne 0 ]; then
  echo "Linting failed. Fix errors before committing."
  exit 1
fi

# Run tests
npm run test
if [ $? -ne 0 ]; then
  echo "Tests failed. Fix failing tests before committing."
  exit 1
fi

echo "Pre-commit checks passed!"
\`\`\`

Use Husky for easier hook management:

\`\`\`json
// package.json
{
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged",
      "commit-msg": "commitlint -E HUSKY_GIT_PARAMS"
    }
  },
  "lint-staged": {
    "*.js": ["eslint --fix", "prettier --write"],
    "*.ts": ["eslint --fix", "prettier --write"]
  }
}
\`\`\`

## 8. Useful Git Commands

**Stash work in progress:**

\`\`\`bash
# Save work temporarily
git stash save "WIP: working on dashboard"

# List stashes
git stash list

# Apply stash
git stash apply stash@{0}

# Apply and remove from stash list
git stash pop
\`\`\`

**Interactive rebase for clean history:**

\`\`\`bash
# Rewrite last 3 commits
git rebase -i HEAD~3

# Options:
# pick   - keep commit as is
# reword - change commit message
# edit   - stop to amend commit
# squash - combine with previous commit
# fixup  - like squash but discard message
# drop   - remove commit
\`\`\`

**Cherry-pick specific commits:**

\`\`\`bash
# Apply specific commit to current branch
git cherry-pick abc123

# Cherry-pick range of commits
git cherry-pick abc123..def456
\`\`\`

**Find bugs with bisect:**

\`\`\`bash
# Start bisecting
git bisect start

# Mark current commit as bad
git bisect bad

# Mark known good commit
git bisect good v1.4.0

# Git checks out middle commit
# Test the commit
npm test

# If tests pass
git bisect good

# If tests fail
git bisect bad

# Repeat until Git finds the problematic commit
# Git will output: "abc123 is the first bad commit"

# Reset
git bisect reset
\`\`\`

## Real-World Impact

Implementing structured Git workflows:
- **Reduced merge conflicts** by 70% (from daily pain to rare occurrence)
- **Faster code reviews** - clear commit history makes reviews 2x faster
- **Zero production incidents** from accidental pushes with protected branches
- **Automatic versioning** and changelogs with conventional commits
- **Onboarding time** reduced from weeks to days with documented workflows

## Key Takeaways

1. **Choose workflow based on deployment frequency** - Git Flow for releases, GitHub Flow for continuous deployment
2. **Write good commit messages** - Future you will thank you
3. **Review code systematically** - Use PR templates and checklists
4. **Resolve conflicts proactively** - Rebase frequently
5. **Automate quality checks** - Git hooks catch issues before push
6. **Protect main branches** - Require reviews, passing CI
7. **Keep history clean** - Interactive rebase for local commits
8. **Communicate with team** - Workflow only works when everyone follows it

Git is powerful but can be chaotic. A solid workflow brings order and enables teams to move fast without breaking things.
    `,
    category: 'Developer Tools',
    tags: ['Git', 'Version Control', 'Workflow', 'Collaboration', 'DevOps'],
    publishedDate: '2024-10-12',
    readTime: '21 min read',
    featured: false,
  },
  {
    id: 'rest-api-design-best-practices',
    title: 'REST API Design: Building APIs That Developers Love',
    excerpt: 'Design principles for building production-grade REST APIs. Learn resource modeling, endpoint design, versioning strategies, authentication patterns, error handling, and documentation that makes integration seamless.',
    content: `
Building REST APIs isn't just about exposing data—it's about creating an interface that's intuitive, consistent, and delightful to use. Here's what I learned building APIs for multiple production systems.

## Why API Design Matters

I've integrated with hundreds of APIs. The best ones feel natural, the worst ones require constant documentation lookup. The difference? Thoughtful design.

**Bad API example:**
\`\`\`
POST /api/createUser
GET /api/getUserData?userId=123
POST /api/deleteUserAccount
GET /api/order-list
POST /api/update_order_status
\`\`\`

**Good API example:**
\`\`\`
POST   /api/v1/users
GET    /api/v1/users/123
DELETE /api/v1/users/123
GET    /api/v1/orders
PATCH  /api/v1/orders/456/status
\`\`\`

## 1. Resource-Oriented Design

Think in terms of resources (nouns), not actions (verbs):

\`\`\`
# Good - Resource-oriented
GET    /api/v1/products           # List products
POST   /api/v1/products           # Create product
GET    /api/v1/products/123       # Get single product
PUT    /api/v1/products/123       # Full update
PATCH  /api/v1/products/123       # Partial update
DELETE /api/v1/products/123       # Delete product

# Bad - Action-oriented
GET    /api/v1/getProducts
POST   /api/v1/createProduct
GET    /api/v1/getProductById
POST   /api/v1/updateProduct
POST   /api/v1/deleteProduct
\`\`\`

**Nested resources for relationships:**

\`\`\`
GET    /api/v1/orders/123/items           # Get items in order 123
POST   /api/v1/orders/123/items           # Add item to order 123
GET    /api/v1/orders/123/items/456       # Get specific item
DELETE /api/v1/orders/123/items/456       # Remove item from order

GET    /api/v1/users/789/orders           # Get all orders for user 789
GET    /api/v1/users/789/orders/123       # Get specific order for user
\`\`\`

**Avoid deep nesting (max 2 levels):**

\`\`\`
# Bad - too deep
GET /api/v1/companies/1/departments/2/teams/3/members/4

# Good - flatten with query params
GET /api/v1/members/4?team=3
GET /api/v1/members?team=3&department=2
\`\`\`

## 2. HTTP Methods and Semantics

Use HTTP verbs correctly:

\`\`\`javascript
// GET - Retrieve data (idempotent, cacheable)
app.get('/api/v1/products', async (req, res) => {
  const products = await Product.find();
  res.json({ data: products });
});

// POST - Create new resource (not idempotent)
app.post('/api/v1/products', async (req, res) => {
  const product = await Product.create(req.body);
  res.status(201)
    .location(\`/api/v1/products/\${product.id}\`)
    .json({ data: product });
});

// PUT - Full replacement (idempotent)
app.put('/api/v1/products/:id', async (req, res) => {
  const product = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    { overwrite: true, new: true }
  );
  res.json({ data: product });
});

// PATCH - Partial update (idempotent)
app.patch('/api/v1/products/:id', async (req, res) => {
  const product = await Product.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    { new: true }
  );
  res.json({ data: product });
});

// DELETE - Remove resource (idempotent)
app.delete('/api/v1/products/:id', async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.status(204).send();
});
\`\`\`

## 3. Response Format Consistency

Use consistent response structure across all endpoints:

\`\`\`javascript
// Success response structure
{
  "success": true,
  "data": {
    "id": 123,
    "name": "Product Name",
    "price": 99.99
  },
  "meta": {
    "timestamp": "2024-11-24T10:30:00Z",
    "version": "1.0"
  }
}

// List response with pagination
{
  "success": true,
  "data": [
    { "id": 1, "name": "Product 1" },
    { "id": 2, "name": "Product 2" }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 150,
    "totalPages": 8,
    "hasNext": true,
    "hasPrevious": false
  },
  "links": {
    "self": "/api/v1/products?page=1",
    "next": "/api/v1/products?page=2",
    "last": "/api/v1/products?page=8"
  }
}

// Error response structure
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid product data",
    "details": [
      {
        "field": "price",
        "message": "Price must be a positive number"
      },
      {
        "field": "name",
        "message": "Name is required"
      }
    ]
  },
  "meta": {
    "timestamp": "2024-11-24T10:30:00Z",
    "requestId": "abc-123-def-456"
  }
}
\`\`\`

## 4. Proper HTTP Status Codes

Use status codes that accurately reflect the response:

\`\`\`javascript
// 2xx Success
200 // OK - Request succeeded
201 // Created - Resource created successfully
202 // Accepted - Request accepted for processing
204 // No Content - Success with no response body (DELETE)

// 4xx Client Errors
400 // Bad Request - Invalid request format
401 // Unauthorized - Authentication required
403 // Forbidden - Authenticated but not authorized
404 // Not Found - Resource doesn't exist
409 // Conflict - Resource already exists or conflict
422 // Unprocessable Entity - Validation failed
429 // Too Many Requests - Rate limit exceeded

// 5xx Server Errors
500 // Internal Server Error - Unexpected server error
502 // Bad Gateway - Invalid upstream response
503 // Service Unavailable - Server temporarily unavailable

// Implementation
app.post('/api/v1/products', async (req, res) => {
  try {
    const { error } = productSchema.validate(req.body);
    if (error) {
      return res.status(422).json({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Invalid product data',
          details: error.details
        }
      });
    }

    const existingProduct = await Product.findOne({
      sku: req.body.sku
    });

    if (existingProduct) {
      return res.status(409).json({
        success: false,
        error: {
          code: 'PRODUCT_EXISTS',
          message: 'Product with this SKU already exists'
        }
      });
    }

    const product = await Product.create(req.body);

    res.status(201)
      .location(\`/api/v1/products/\${product.id}\`)
      .json({
        success: true,
        data: product
      });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'Failed to create product'
      }
    });
  }
});
\`\`\`

## 5. Filtering, Sorting, and Pagination

Make data retrieval flexible:

\`\`\`javascript
// Filtering
GET /api/v1/products?category=electronics&price_min=100&price_max=500

// Sorting
GET /api/v1/products?sort=-price,name  // Descending price, ascending name

// Pagination
GET /api/v1/products?page=2&limit=20

// Field selection (sparse fieldsets)
GET /api/v1/products?fields=id,name,price

// Search
GET /api/v1/products?q=laptop

// Combined
GET /api/v1/products?category=electronics&sort=-price&page=1&limit=20&fields=id,name,price

// Implementation
app.get('/api/v1/products', async (req, res) => {
  const {
    page = 1,
    limit = 20,
    sort = '-createdAt',
    fields,
    q,
    ...filters
  } = req.query;

  // Build query
  let query = Product.find();

  // Apply filters
  if (q) {
    query = query.where('name', new RegExp(q, 'i'));
  }

  Object.keys(filters).forEach(key => {
    if (key.endsWith('_min')) {
      const field = key.replace('_min', '');
      query = query.where(field).gte(filters[key]);
    } else if (key.endsWith('_max')) {
      const field = key.replace('_max', '');
      query = query.where(field).lte(filters[key]);
    } else {
      query = query.where(key, filters[key]);
    }
  });

  // Apply sorting
  query = query.sort(sort);

  // Apply field selection
  if (fields) {
    query = query.select(fields.split(',').join(' '));
  }

  // Apply pagination
  const skip = (page - 1) * limit;
  query = query.skip(skip).limit(parseInt(limit));

  // Execute query
  const [products, total] = await Promise.all([
    query.exec(),
    Product.countDocuments(query.getFilter())
  ]);

  res.json({
    success: true,
    data: products,
    pagination: {
      page: parseInt(page),
      limit: parseInt(limit),
      total,
      totalPages: Math.ceil(total / limit)
    }
  });
});
\`\`\`

## 6. Authentication and Authorization

Implement secure authentication:

\`\`\`javascript
// JWT Authentication
const jwt = require('jsonwebtoken');

// Login endpoint
app.post('/api/v1/auth/login', async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).json({
      success: false,
      error: {
        code: 'INVALID_CREDENTIALS',
        message: 'Invalid email or password'
      }
    });
  }

  const token = jwt.sign(
    { userId: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );

  const refreshToken = jwt.sign(
    { userId: user.id },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: '30d' }
  );

  res.json({
    success: true,
    data: {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
      },
      token,
      refreshToken
    }
  });
});

// Auth middleware
const authenticate = async (req, res, next) => {
  const token = req.headers.authorization?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({
      success: false,
      error: {
        code: 'NO_TOKEN',
        message: 'Authentication required'
      }
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.userId);
    next();
  } catch (err) {
    res.status(401).json({
      success: false,
      error: {
        code: 'INVALID_TOKEN',
        message: 'Invalid or expired token'
      }
    });
  }
};

// Authorization middleware
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        error: {
          code: 'FORBIDDEN',
          message: 'Insufficient permissions'
        }
      });
    }
    next();
  };
};

// Usage
app.get('/api/v1/products', authenticate, getProducts);
app.delete('/api/v1/products/:id', authenticate, authorize('admin'), deleteProduct);
\`\`\`

## 7. Rate Limiting

Protect your API from abuse:

\`\`\`javascript
const rateLimit = require('express-rate-limit');
const RedisStore = require('rate-limit-redis');
const redis = require('redis');

const redisClient = redis.createClient();

// Basic rate limiting
const limiter = rateLimit({
  store: new RedisStore({
    client: redisClient,
    prefix: 'rl:'
  }),
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Max 100 requests per window
  message: {
    success: false,
    error: {
      code: 'RATE_LIMIT_EXCEEDED',
      message: 'Too many requests, please try again later'
    }
  },
  standardHeaders: true, // Return rate limit info in headers
  legacyHeaders: false
});

// Different limits for different endpoints
const strictLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5 // Only 5 requests per 15 minutes
});

app.use('/api/v1/', limiter);
app.use('/api/v1/auth/login', strictLimiter);

// Custom rate limiting logic
const customLimiter = async (req, res, next) => {
  const key = \`rl:\${req.user.id}\`;
  const limit = req.user.isPremium ? 1000 : 100;

  const current = await redisClient.incr(key);

  if (current === 1) {
    await redisClient.expire(key, 3600); // 1 hour
  }

  if (current > limit) {
    return res.status(429).json({
      success: false,
      error: {
        code: 'RATE_LIMIT_EXCEEDED',
        message: 'Rate limit exceeded'
      }
    });
  }

  res.setHeader('X-RateLimit-Limit', limit);
  res.setHeader('X-RateLimit-Remaining', limit - current);

  next();
};
\`\`\`

## 8. API Versioning

Support multiple API versions:

\`\`\`javascript
// URL versioning (recommended)
app.use('/api/v1', v1Routes);
app.use('/api/v2', v2Routes);

// Header versioning
app.use((req, res, next) => {
  const version = req.headers['api-version'] || '1';
  req.apiVersion = version;
  next();
});

// Accept header versioning
app.use((req, res, next) => {
  const accept = req.headers.accept;
  if (accept?.includes('application/vnd.api.v2+json')) {
    req.apiVersion = '2';
  } else {
    req.apiVersion = '1';
  }
  next();
});
\`\`\`

## 9. Documentation

Use OpenAPI/Swagger for interactive documentation:

\`\`\`javascript
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Product API',
      version: '1.0.0',
      description: 'API for managing products'
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server'
      }
    ]
  },
  apis: ['./routes/*.js']
};

const specs = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

/**
 * @swagger
 * /api/v1/products:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number
 *     responses:
 *       200:
 *         description: List of products
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Product'
 */
\`\`\`

## Real-World Impact

Implementing these patterns in **Sianggar ERP API**:
- **Developer onboarding**: From days to hours with clear docs
- **Integration errors**: Reduced by 80% with consistent responses
- **API abuse**: Prevented with rate limiting (saved server costs)
- **Version migration**: Smooth v1→v2 transition with zero downtime
- **Mobile app support**: Flexible filtering reduced data transfer by 60%

## Key Takeaways

1. **Think resources, not actions** - Use nouns in URLs, verbs in HTTP methods
2. **Be consistent** - Same patterns across all endpoints
3. **Use proper status codes** - They convey meaning
4. **Paginate everything** - Never return unbounded lists
5. **Secure by default** - Authentication + rate limiting + validation
6. **Version your API** - Plan for change from day one
7. **Document thoroughly** - Good docs = happy developers
8. **Design for clients** - API design is user experience design

A well-designed API is a joy to use. These principles ensure your API is intuitive, maintainable, and scalable.
    `,
    category: 'Backend Development',
    tags: ['REST API', 'API Design', 'Backend', 'Node.js', 'Best Practices'],
    publishedDate: '2024-10-05',
    readTime: '22 min read',
    featured: false,
  },
  {
    id: 'postgresql-advanced-features',
    title: 'PostgreSQL Advanced Features: Full-Text Search, Triggers & More',
    excerpt: 'Go beyond basic SQL with PostgreSQL advanced features. Implement full-text search, database triggers, materialized views, JSON queries, and custom functions that transform your database into a powerful application layer.',
    content: `
PostgreSQL isn't just a relational database—it's a sophisticated platform with features that can eliminate entire application layers. Here's what I discovered optimizing production databases.

## Why PostgreSQL Advanced Features Matter

Many developers use PostgreSQL like MySQL, missing powerful features that solve real problems:
- Full-text search (no need for Elasticsearch for simple cases)
- Triggers (automatic data validation and logging)
- Materialized views (pre-computed analytics)
- JSON support (document database capabilities)
- Custom functions (business logic in the database)

## 1. Full-Text Search

Implement search without external services:

\`\`\`sql
-- Add tsvector column for search
ALTER TABLE products
ADD COLUMN search_vector tsvector;

-- Create search index
CREATE INDEX products_search_idx
ON products
USING GIN(search_vector);

-- Update search vector (manual)
UPDATE products
SET search_vector =
  setweight(to_tsvector('english', coalesce(name, '')), 'A') ||
  setweight(to_tsvector('english', coalesce(description, '')), 'B') ||
  setweight(to_tsvector('english', coalesce(category, '')), 'C');

-- Create trigger to auto-update search vector
CREATE FUNCTION products_search_trigger() RETURNS trigger AS $$
BEGIN
  NEW.search_vector :=
    setweight(to_tsvector('english', coalesce(NEW.name, '')), 'A') ||
    setweight(to_tsvector('english', coalesce(NEW.description, '')), 'B') ||
    setweight(to_tsvector('english', coalesce(NEW.category, '')), 'C');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER products_search_update
BEFORE INSERT OR UPDATE ON products
FOR EACH ROW
EXECUTE FUNCTION products_search_trigger();

-- Search query
SELECT
  id,
  name,
  ts_rank(search_vector, query) AS rank
FROM products,
     to_tsquery('english', 'laptop & gaming') AS query
WHERE search_vector @@ query
ORDER BY rank DESC
LIMIT 20;

-- Search with highlighting
SELECT
  id,
  name,
  ts_headline('english', description, query) AS snippet,
  ts_rank(search_vector, query) AS rank
FROM products,
     to_tsquery('english', 'laptop | computer') AS query
WHERE search_vector @@ query
ORDER BY rank DESC;
\`\`\`

**Node.js implementation:**

\`\`\`javascript
// Search products
app.get('/api/v1/products/search', async (req, res) => {
  const { q } = req.query;

  // Convert search string to tsquery format
  const searchQuery = q
    .split(' ')
    .filter(word => word.length > 0)
    .join(' & ');

  const result = await db.query(
    \`
    SELECT
      id,
      name,
      price,
      ts_headline('english', description, query,
        'MaxWords=50, MinWords=20') AS snippet,
      ts_rank(search_vector, query) AS rank
    FROM products,
         to_tsquery('english', $1) AS query
    WHERE search_vector @@ query
    ORDER BY rank DESC
    LIMIT 50
    \`,
    [searchQuery]
  );

  res.json({
    success: true,
    data: result.rows
  });
});
\`\`\`

## 2. Database Triggers

Automate data integrity and logging:

\`\`\`sql
-- Audit log table
CREATE TABLE audit_log (
  id SERIAL PRIMARY KEY,
  table_name VARCHAR(50),
  operation VARCHAR(10),
  old_data JSONB,
  new_data JSONB,
  user_id INTEGER,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Generic audit trigger function
CREATE OR REPLACE FUNCTION audit_trigger()
RETURNS TRIGGER AS $$
BEGIN
  IF (TG_OP = 'DELETE') THEN
    INSERT INTO audit_log (table_name, operation, old_data, user_id)
    VALUES (TG_TABLE_NAME, TG_OP, row_to_json(OLD), current_setting('app.user_id', true)::INTEGER);
    RETURN OLD;
  ELSIF (TG_OP = 'UPDATE') THEN
    INSERT INTO audit_log (table_name, operation, old_data, new_data, user_id)
    VALUES (TG_TABLE_NAME, TG_OP, row_to_json(OLD), row_to_json(NEW), current_setting('app.user_id', true)::INTEGER);
    RETURN NEW;
  ELSIF (TG_OP = 'INSERT') THEN
    INSERT INTO audit_log (table_name, operation, new_data, user_id)
    VALUES (TG_TABLE_NAME, TG_OP, row_to_json(NEW), current_setting('app.user_id', true)::INTEGER);
    RETURN NEW;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Apply audit trigger to tables
CREATE TRIGGER products_audit
AFTER INSERT OR UPDATE OR DELETE ON products
FOR EACH ROW EXECUTE FUNCTION audit_trigger();

CREATE TRIGGER orders_audit
AFTER INSERT OR UPDATE OR DELETE ON orders
FOR EACH ROW EXECUTE FUNCTION audit_trigger();

-- Auto-update timestamp trigger
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER products_updated_at
BEFORE UPDATE ON products
FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Prevent negative inventory
CREATE OR REPLACE FUNCTION check_inventory()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.stock < 0 THEN
    RAISE EXCEPTION 'Stock cannot be negative for product %', NEW.id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER products_check_stock
BEFORE INSERT OR UPDATE ON products
FOR EACH ROW EXECUTE FUNCTION check_inventory();
\`\`\`

**Set user context in Node.js:**

\`\`\`javascript
// Middleware to set user context
app.use(async (req, res, next) => {
  if (req.user) {
    await db.query(
      'SELECT set_config($1, $2, true)',
      ['app.user_id', req.user.id.toString()]
    );
  }
  next();
});
\`\`\`

## 3. Materialized Views

Pre-compute expensive queries:

\`\`\`sql
-- Create materialized view for sales analytics
CREATE MATERIALIZED VIEW sales_by_category AS
SELECT
  p.category,
  COUNT(DISTINCT o.id) AS total_orders,
  COUNT(oi.id) AS total_items,
  SUM(oi.quantity) AS total_quantity,
  SUM(oi.quantity * oi.price) AS total_revenue,
  AVG(oi.price) AS avg_price
FROM products p
JOIN order_items oi ON p.id = oi.product_id
JOIN orders o ON oi.order_id = o.id
WHERE o.status = 'completed'
  AND o.created_at >= NOW() - INTERVAL '30 days'
GROUP BY p.category;

-- Create index on materialized view
CREATE INDEX ON sales_by_category(category);

-- Refresh materialized view
REFRESH MATERIALIZED VIEW sales_by_category;

-- Concurrent refresh (doesn't lock the view)
REFRESH MATERIALIZED VIEW CONCURRENTLY sales_by_category;

-- Auto-refresh with a function
CREATE OR REPLACE FUNCTION refresh_sales_view()
RETURNS void AS $$
BEGIN
  REFRESH MATERIALIZED VIEW CONCURRENTLY sales_by_category;
END;
$$ LANGUAGE plpgsql;

-- Schedule refresh (using pg_cron extension)
SELECT cron.schedule('refresh-sales', '0 * * * *', 'SELECT refresh_sales_view()');
\`\`\`

**Query materialized view:**

\`\`\`javascript
app.get('/api/v1/analytics/sales-by-category', async (req, res) => {
  // Query pre-computed data (fast!)
  const result = await db.query(\`
    SELECT
      category,
      total_orders,
      total_revenue,
      avg_price
    FROM sales_by_category
    ORDER BY total_revenue DESC
  \`);

  res.json({
    success: true,
    data: result.rows,
    meta: {
      lastUpdated: result.rows[0]?.last_refresh
    }
  });
});
\`\`\`

## 4. JSON Support

Use PostgreSQL as a document database:

\`\`\`sql
-- Table with JSONB column
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  attributes JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Insert JSON data
INSERT INTO products (name, attributes) VALUES
('Laptop', '{"brand": "Dell", "cpu": "i7", "ram": 16, "specs": {"screen": "15.6", "weight": "1.8kg"}}'),
('Phone', '{"brand": "Samsung", "storage": 128, "colors": ["black", "white", "blue"]}');

-- Query JSON fields
SELECT name, attributes->>'brand' AS brand
FROM products
WHERE attributes->>'brand' = 'Dell';

-- Query nested JSON
SELECT name, attributes->'specs'->>'screen' AS screen_size
FROM products
WHERE (attributes->'specs'->>'screen')::NUMERIC > 14;

-- Query JSON arrays
SELECT name, attributes->'colors'
FROM products
WHERE attributes->'colors' ? 'black';

-- Create index on JSON field
CREATE INDEX idx_product_brand ON products((attributes->>'brand'));

-- GIN index for full JSON search
CREATE INDEX idx_product_attrs ON products USING GIN(attributes);

-- Update JSON field
UPDATE products
SET attributes = jsonb_set(attributes, '{price}', '999', true)
WHERE name = 'Laptop';

-- Add to JSON array
UPDATE products
SET attributes = jsonb_set(
  attributes,
  '{colors}',
  (attributes->'colors') || '["red"]'::jsonb
)
WHERE name = 'Phone';

-- Remove from JSON
UPDATE products
SET attributes = attributes - 'old_field'
WHERE id = 1;
\`\`\`

**Node.js JSON queries:**

\`\`\`javascript
// Find products by JSON attribute
app.get('/api/v1/products', async (req, res) => {
  const { brand, min_ram } = req.query;

  let query = 'SELECT * FROM products WHERE 1=1';
  const params = [];

  if (brand) {
    params.push(brand);
    query += \` AND attributes->>'brand' = $\${params.length}\`;
  }

  if (min_ram) {
    params.push(min_ram);
    query += \` AND (attributes->>'ram')::INTEGER >= $\${params.length}\`;
  }

  const result = await db.query(query, params);

  res.json({
    success: true,
    data: result.rows
  });
});

// Update JSON attributes
app.patch('/api/v1/products/:id/attributes', async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  // Merge new attributes with existing
  const result = await db.query(
    \`
    UPDATE products
    SET attributes = attributes || $1::jsonb
    WHERE id = $2
    RETURNING *
    \`,
    [JSON.stringify(updates), id]
  );

  res.json({
    success: true,
    data: result.rows[0]
  });
});
\`\`\`

## 5. Custom Functions

Move business logic to the database:

\`\`\`sql
-- Function to calculate order total
CREATE OR REPLACE FUNCTION calculate_order_total(order_id INTEGER)
RETURNS NUMERIC AS $$
DECLARE
  total NUMERIC;
BEGIN
  SELECT SUM(quantity * price)
  INTO total
  FROM order_items
  WHERE order_id = calculate_order_total.order_id;

  RETURN COALESCE(total, 0);
END;
$$ LANGUAGE plpgsql;

-- Use function
SELECT
  id,
  customer_id,
  calculate_order_total(id) AS total
FROM orders;

-- Function with multiple return values
CREATE TYPE order_summary AS (
  order_count INTEGER,
  total_revenue NUMERIC,
  avg_order_value NUMERIC
);

CREATE OR REPLACE FUNCTION get_customer_summary(cust_id INTEGER)
RETURNS order_summary AS $$
DECLARE
  result order_summary;
BEGIN
  SELECT
    COUNT(*),
    SUM(total),
    AVG(total)
  INTO result
  FROM orders
  WHERE customer_id = cust_id
    AND status = 'completed';

  RETURN result;
END;
$$ LANGUAGE plpgsql;

-- Use function
SELECT * FROM get_customer_summary(123);

-- Function returning table
CREATE OR REPLACE FUNCTION get_low_stock_products(threshold INTEGER)
RETURNS TABLE(
  product_id INTEGER,
  product_name VARCHAR,
  current_stock INTEGER,
  reorder_level INTEGER
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    id,
    name,
    stock,
    minimum_stock
  FROM products
  WHERE stock < threshold
  ORDER BY stock ASC;
END;
$$ LANGUAGE plpgsql;

-- Use function
SELECT * FROM get_low_stock_products(10);
\`\`\`

## 6. Window Functions

Advanced analytics without GROUP BY:

\`\`\`sql
-- Running total
SELECT
  order_date,
  total,
  SUM(total) OVER (ORDER BY order_date) AS running_total
FROM orders;

-- Ranking
SELECT
  product_id,
  quantity,
  RANK() OVER (ORDER BY quantity DESC) AS rank,
  DENSE_RANK() OVER (ORDER BY quantity DESC) AS dense_rank
FROM order_items;

-- Partition by category
SELECT
  category,
  name,
  price,
  AVG(price) OVER (PARTITION BY category) AS category_avg_price,
  price - AVG(price) OVER (PARTITION BY category) AS price_difference
FROM products;

-- Row number within partition
SELECT
  category,
  name,
  price,
  ROW_NUMBER() OVER (PARTITION BY category ORDER BY price DESC) AS price_rank
FROM products;

-- Get top 3 products per category
SELECT *
FROM (
  SELECT
    category,
    name,
    sales,
    ROW_NUMBER() OVER (PARTITION BY category ORDER BY sales DESC) AS rn
  FROM products
) ranked
WHERE rn <= 3;
\`\`\`

## 7. Common Table Expressions (CTEs)

Simplify complex queries:

\`\`\`sql
-- Basic CTE
WITH high_value_customers AS (
  SELECT
    customer_id,
    SUM(total) AS total_spent
  FROM orders
  GROUP BY customer_id
  HAVING SUM(total) > 10000
)
SELECT
  c.name,
  c.email,
  hvc.total_spent
FROM customers c
JOIN high_value_customers hvc ON c.id = hvc.customer_id;

-- Recursive CTE (organizational hierarchy)
WITH RECURSIVE org_chart AS (
  -- Base case
  SELECT id, name, manager_id, 1 AS level
  FROM employees
  WHERE manager_id IS NULL

  UNION ALL

  -- Recursive case
  SELECT e.id, e.name, e.manager_id, oc.level + 1
  FROM employees e
  JOIN org_chart oc ON e.manager_id = oc.id
)
SELECT * FROM org_chart ORDER BY level, name;

-- Multiple CTEs
WITH
monthly_sales AS (
  SELECT
    DATE_TRUNC('month', order_date) AS month,
    SUM(total) AS revenue
  FROM orders
  WHERE status = 'completed'
  GROUP BY DATE_TRUNC('month', order_date)
),
sales_growth AS (
  SELECT
    month,
    revenue,
    LAG(revenue) OVER (ORDER BY month) AS prev_month_revenue,
    revenue - LAG(revenue) OVER (ORDER BY month) AS growth
  FROM monthly_sales
)
SELECT
  month,
  revenue,
  growth,
  ROUND((growth / NULLIF(prev_month_revenue, 0) * 100), 2) AS growth_percentage
FROM sales_growth
ORDER BY month DESC;
\`\`\`

## Real-World Impact

Using these features in **Sianggar ERP**:
- **Full-text search**: Replaced Elasticsearch for product search (saved hosting costs)
- **Triggers**: Automated audit logging (100% data change tracking)
- **Materialized views**: Dashboard queries from 8s to 50ms (160x faster)
- **JSON support**: Flexible product attributes without schema migrations
- **Custom functions**: Reduced API roundtrips by 40%

## Key Takeaways

1. **Full-text search** - Built-in, no external service needed for simple cases
2. **Triggers** - Automate validation, logging, and data integrity
3. **Materialized views** - Pre-compute expensive queries
4. **JSON support** - Schema flexibility when needed
5. **Custom functions** - Move complex logic to database
6. **Window functions** - Analytics without complex GROUP BYs
7. **CTEs** - Make complex queries readable and maintainable

PostgreSQL is more than a database—it's a powerful application platform. These features can simplify your architecture and boost performance dramatically.
    `,
    category: 'Database',
    tags: ['PostgreSQL', 'SQL', 'Database', 'Full-Text Search', 'Performance'],
    publishedDate: '2024-09-28',
    readTime: '24 min read',
    featured: true,
  },
];
