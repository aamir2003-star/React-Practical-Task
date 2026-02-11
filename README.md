# Multi-Stage Registration App

A dynamic React-based registration application with multi-stage form completion, real-time progress tracking, and role-based data collection. Built with Vite for fast development and modern React patterns.

## 🚀 Features

- **Multi-Stage Registration**: 3-step registration process with role selection and role-specific forms
- **Dynamic Progress Bar**: Real-time progress updates based on field completion with color-coded indicators
- **Role-Based Forms**:
  - Student: School name and grade
  - Teacher: Subject and years of experience
  - Professor: Department and research area
- **Form Validation**: Client-side validation with error handling
- **State Management**: Centralized state using React Context
- **Responsive Design**: Tailwind CSS for modern, responsive UI
- **Auto-Redirect**: Success page with countdown timer redirecting to home and showing welcome {role} and also a button to go to dashboard home
- **State Reset**: Page reload resets all data for fresh starts

## 🛠 Tech Stack

- **Frontend**: React 18 with Hooks
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **State Management**: React Context API
- **Icons/Forms**: Standard HTML5 inputs with custom styling

## 📁 Project Structure

```
src/
├── components/
│   ├── ProgressBar.jsx          # Dynamic progress bar component
│   ├── FormError.jsx            # Error message display
│   ├── Roles/
│   │   ├── Student.jsx          # Student-specific form
│   │   ├── Teacher.jsx          # Teacher-specific form
│   │   └── Professor.jsx        # Professor-specific form
├── context/
│   └── StateContext.jsx         # Global state management
├── layouts/
│   └── DashboardLayout.jsx      # Main layout with progress components
├── pages/
│   ├── Home.jsx                 # Landing page with registration start
│   ├── Stage1.jsx               # Role selection stage
│   ├── Stage2.jsx               # Role-specific details stage
│   ├── Stage3.jsx               # Email and agreement stage
│   ├── Success.jsx              # Success confirmation page
│   └── index.js                 # Page exports
├── routes/
│   ├── IndexRoutes.jsx          # Route configuration
│   └── StageRouting.jsx         # Stage navigation logic
├── colorRules.json              # Progress bar color configuration
├── App.jsx                      # Main app component
├── index.css                    # Global styles
└── main.jsx                     # App entry point
```

## 🧠 Core Logic and Functionality

### State Management

The app uses React Context (`StateContext.jsx`) for centralized state management:

- **`role`**: Selected user role (student/teacher/professor)
- **`formData`**: Collected form data object
- **`completedStage`**: Object tracking stage completion status
- **`fieldCompleted`**: Array-based tracking of individual field completion per stage
- **`progress`**: Current progress percentage (0-100)
- **`colorRules`**: JSON configuration for progress bar colors

### Progress Calculation

Progress is calculated dynamically based on field completion:

```javascript
const calculateProgress = () => {
  let prog = 0;
  // Stage 1: 33% if role selected
  const stage1Completed = fieldCompleted.stage1.filter(Boolean).length;
  prog += (stage1Completed / fieldCompleted.stage1.length) * 33;
  // Stage 2: proportional to completed fields
  const stage2Completed = fieldCompleted.stage2.filter(Boolean).length;
  prog += (stage2Completed / fieldCompleted.stage2.length) * 33;
  // Stage 3: proportional to completed fields
  const stage3Completed = fieldCompleted.stage3.filter(Boolean).length;
  prog += (stage3Completed / fieldCompleted.stage3.length) * 33;
  return Math.min(Math.round(prog), 99);
};
```

- Each stage contributes 33% to total progress
- Within each stage, progress is proportional to completed fields
- Final submission sets progress to 100%

### Field Completion Tracking

Uses arrays to track completion, allowing dynamic scaling:

```javascript
const [fieldCompleted, setFieldCompleted] = useState({
  stage1: [false], // Role selection
  stage2: [false, false], // Two fields per role
  stage3: [false, false], // Email and agreement
});
```

### Progress Bar Colors

Color rules defined in `colorRules.json`:

```json
[
  { "min": 0, "max": 32, "color": "bg-red-500" },
  { "min": 33, "max": 65, "color": "bg-orange-500" },
  { "min": 66, "max": 99, "color": "bg-blue-500" },
  { "min": 100, "max": 100, "color": "bg-green-500" }
]
```

### Form Flow

1. **Home Page**: Initial welcome with "Start Registration" button
2. **Stage 1**: Role selection (Student/Teacher/Professor)
   - Progress: 33% on selection
3. **Stage 2**: Role-specific form
   - Student: School + Grade
   - Teacher: Subject + Experience
   - Professor: Department + Research Area
   - Progress: Increases as fields are filled (up to 66%)
4. **Stage 3**: Email input + Agreement checkbox
   - Progress: Increases to 99% when both completed
5. **Success Page**: Shows collected data, auto-redirects to home after 8 seconds
6. **Reset**: Clicking "Go to Dashboard Home" reloads the page, resetting all state

### Validation and Error Handling

- **Stage 1**: Requires role selection before proceeding
- **Stage 2**:
  - Validates required fields and data types (e.g., grade 1-12, experience >0)
  - Text fields (school name, subject, department, research area) must be at least 2 characters long
- **Stage 3**: Email regex validation + agreement checkbox required
- Error messages displayed via `FormError` component

### Navigation and Routing

The app uses React Router for client-side routing with comprehensive stage protection:

- **Routing Structure** (`IndexRoutes.jsx` → `StageRouting.jsx`):
  - `/` → Home page (landing page)
  - `/register/stage-1` → Role selection stage
  - `/register/stage-2` → Role-specific details
  - `/register/stage-3` → Email and agreement
  - `/register/success` → Success confirmation
  - Protected navigation ensures users can only access stages sequentially
  - Any invalid URL redirects to the appropriate stage

- **Stage Locking Logic**:
  - Each stage checks if the previous stage is completed before rendering
  - `completedStage` object tracks which stages are done
  - Direct URL access to locked stages redirects to earliest incomplete stage
  - Completed stages auto-redirect to next stage to prevent re-editing
  - Browser back button on completed stages redirects to Stage 1
  - Uses `popstate` event listener to prevent browser history manipulation
  - All stage completions use `navigate(..., { replace: true })` to prevent history buildup

- **Protected Navigation Flow**:
  - Stage 1 → Direct access allowed (entry point)
  - Stage 2 → Requires Stage 1 completion
  - Stage 3 → Requires Stage 2 completion
  - Success → Requires Stage 3 completion

### Routing Structure

Routes defined in `src/routes/`:

**IndexRoutes.jsx** - Main route configuration:

```jsx
<Route path="/" element={<Home />} />
<Route path="/register/*" element={<StageRouting />} />
<Route path="/*" element={<NotFoundPage />} />
```

**StageRouting.jsx** - Protected stage routes:

```jsx
<Route element={<DashboardLayout />}>
  <Route path="stage-1" element={<Stage1 />} />
  <Route
    path="stage-2"
    element={
      completedStage.stage1 ? <Stage2 /> : <Navigate to="/register/stage-1" />
    }
  />
  <Route
    path="stage-3"
    element={
      completedStage.stage2 ? <Stage3 /> : <Navigate to="/register/stage-1" />
    }
  />
  <Route
    path="success"
    element={
      completedStage.stage3 ? <Success /> : <Navigate to="/register/stage-1" />
    }
  />
</Route>
```

Each stage has conditional rendering that checks completion status before rendering.

### State Flow

**State Management Architecture** (`StateContext.jsx`):

```javascript
// Global state structure
{
  role: '',                           // 'student' | 'teacher' | 'professor'
  formData: {},                       // { school, grade } | { subject, exp } | { dept, research, email }
  completedStage: {                   // Track which stages are locked
    stage1: false,
    stage2: false,
    stage3: false
  },
  fieldCompleted: {                   // Track individual field completion per stage
    stage1: [false],                  // 1 field (role selection)
    stage2: [false, false],           // 2 fields (role-specific data)
    stage3: [false, false]            // 2 fields (email, agreement)
  },
  progress: 0,                        // 0-100%
  colorRules: [...]                   // Progress bar color configuration
}
```

**State Flow Diagram**:

1. User selects role → `setRole()` + `setFieldCompleted(stage1)` → progress updates
2. User fills Stage 2 fields → `setFormData()` + `setFieldCompleted(stage2)` → progress updates
3. User submits Stage 2 → `setCompletedStage(stage2: true)` → redirects to Stage 3
4. User fills Stage 3 → `setFieldCompleted(stage3)` → progress updates to 99%
5. User submits → `setCompletedStage(stage3: true)` → redirects to Success
6. Success page triggers `useEffect` → updates progress to 100%

**Why Context API**:

- Single source of truth for global state
- Avoids prop drilling
- Easy to reset all state on page reload
- All components can subscribe to state changes

### Validation Strategy

**Three-Layer Validation**:

1. **Field-Level Validation** (Real-time):
   - Fires on every `onChange` event
   - Updates `fieldCompleted` array immediately
   - Progress bar updates in real-time
   - Example: `handleSchool()` in Student.jsx

   ```javascript
   const handleSchool = (e) => {
     setFormData({ ...formData, school: e.target.value });
     setFieldCompleted((prev) => ({
       ...prev,
       stage2: [e.target.value.trim() ? true : false, prev.stage2[1]],
     }));
   };
   ```

2. **Form Submission Validation**:
   - Triggered when user clicks "Next" button
   - Validates all required fields
   - Checks data type constraints
   - Minimum length requirements (2+ characters)
   - Shows error alerts for invalid data
   - Prevents progression to next stage

3. **Validation Rules by Stage**:

   **Stage 1**: Role selection (radio/select input)
   - Must select one of: student, teacher, professor
   - Error: "Select a role to move forward"

   **Stage 2**: Role-specific validation
   - All fields required and non-empty
   - Text fields: minimum 2 characters
   - Student: Grade must be 1-12 (numeric)
   - Teacher: Experience must be 0-40 (numeric, non-negative)
   - Error messages guide user to fix field

   **Stage 3**: Final validation
   - Email: Valid regex pattern `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`
   - Agreement: Checkbox must be checked
   - Both required before submission
   - Error: "Please enter a valid email and agree to the terms"

### Hook Usage Reasoning

**Why Hooks** (Functional Components):

- **Modern React**: Hooks are the recommended approach in React 18+
- **Simpler Logic**: No need for class lifecycle methods
- **Code Reusability**: Custom hooks allow sharing logic
- **Better Performance**: Automatic optimization with dependency arrays
- **Cleaner Syntax**: Less boilerplate than class components

**Hook Breakdown**:

1. **`useState()`** - Manage component-level state
   - Used in all stage components for form inputs and error messages
   - Example: `const [error, setError] = useState('')`
   - Why: Keeps state local to component, easier to manage form inputs

2. **`useContext()`** - Access global state
   - Used in all stages to access `StateManagerContext`
   - Example: `const { role, setRole } = useContext(StateManagerContext)`
   - Why: Connect components to global state without prop drilling

3. **`useEffect()`** - Side effects and lifecycle
   - **Auto-redirect on completion**: Redirects to next stage when current completes
   - **Browser history protection**: Monitors `popstate` events on back button
   - **Clean up**: Returns unsubscribe function to prevent memory leaks

   ```javascript
   useEffect(() => {
     if (completedStage.stage1) {
       navigate('/register/stage-2', { replace: true });
     }
   }, [completedStage.stage1, navigate]);
   ```

   - Why: Execute side effects when state changes, with proper cleanup

4. **`useNavigate()`** - Client-side navigation
   - Used in all stages for moving between routes
   - Example: `navigate('/register/stage-2', { replace: true })`
   - Why: Programmatic navigation without page reload, `replace: true` prevents back button access

5. **`useRef()`** - Direct DOM access
   - Used for form input focus management
   - Example: `const selectRef = useRef()`
   - Why: Focus on invalid inputs to improve UX, doesn't trigger re-render

6. **`useNavigate()` in class component**:
   - Stage 3 is a class component, uses hooks via wrapper function
   - Wrapper injects `navigate` as prop to class component
   - Why: Some libraries/patterns require class components, hooks bridge the gap

### Difference Between Functional and Class Components

**Functional Components** (Stages 1, 2, and role components):

```javascript
// Clean, modern syntax
function Stage1() {
  const [error, setError] = useState('');
  useEffect(() => {
    /* side effects */
  }, [deps]);
  return <JSX />;
}
```

- **Advantages**:
  - Hooks for state/lifecycle management
  - Simpler syntax, less boilerplate
  - Better performance optimization
  - Easier to test
  - Recommended modern approach

- **Disadvantages**:
  - Hooks have rules (only top-level, dependency arrays)
  - Learning curve for beginners

**Class Components** (Stage 3):

```javascript
class Stage3Component extends Component {
  state = { email: '', agree: false };
  componentDidMount() {
    /* lifecycle */
  }
  render() {
    return <JSX />;
  }
}
```

- **Why used for Stage 3**:
  - Historical code (started with class component)
  - Demonstrates both patterns in same app
  - Works perfectly fine for this use case

- **Advantages**:
  - `componentDidMount`, `componentWillUnmount` for lifecycle
  - `this.state` for state management
  - Easier for developers from class-based languages

- **Disadvantages**:
  - More boilerplate code
  - `this` context confusion
  - Harder to reuse logic between components
  - No hooks support

**Why Both in This App**:

- Functional components dominate modern React
- Stage 3 class component shows both patterns work
- Demonstrates interoperability between patterns

### Stage Locking Logic

**How Stages are Protected**:

1. **Route-Level Protection** (`StageRouting.jsx`):

   ```javascript
   <Route
     path="stage-2"
     element={
       completedStage.stage1 ? <Stage2 /> : <Navigate to="/register/stage-1" />
     }
   />
   ```

   - Before rendering component, checks if previous stage is completed
   - If not completed, redirects to earliest incomplete stage
   - Prevents URL manipulation to skip stages

2. **Component-Level Protection** (Each stage component):

   ```javascript
   useEffect(() => {
     if (completedStage.stage2) {
       navigate('/register/stage-3', { replace: true });
     }
   }, [completedStage.stage2, navigate]);
   ```

   - When user attempts to re-access completed stage
   - Auto-redirects to next stage
   - `replace: true` removes from history

3. **Browser History Protection** (Prevents back button):

   ```javascript
   useEffect(() => {
     const handlePopState = (e) => {
       if (completedStage.stage1) {
         e.preventDefault();
         navigate('/register/stage-1', { replace: true });
       }
     };
     window.addEventListener('popstate', handlePopState);
     return () => window.removeEventListener('popstate', handlePopState);
   }, [completedStage.stage1, navigate]);
   ```

   - Monitors browser back button clicks (`popstate` event)
   - If stage is completed and user tries to go back
   - Redirects to Stage 1 instead of going back
   - Cleanup function removes listener to prevent memory leaks

4. **Data Persistence with Completion Status**:
   - `completedStage` object persists in state
   - Changing page or components resets state
   - Browser page reload triggers `setProgress(100)` on success page
   - Ensures stages remain locked even after refresh

**Protection Sequence**:

```
User completes Stage 1
  ↓
navigate('/register/stage-2', { replace: true })
  ↓
Stage 2 renders
  ↓
User clicks browser back button
  ↓
popstate event fires
  ↓
Check: Is Stage 1 completed? YES
  ↓
navigate('/register/stage-1', { replace: true })
  ↓
User redirected to Stage 1 (remains in app flow)
```

## 🚀 Installation and Setup

1. **Clone the repository**:

   ```bash
   git clone <repository-url>
   cd react-practicl-project
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Start development server**:

   ```bash
   npm run dev
   ```

4. **Build for production**:

   ```bash
   npm run build
   ```

5. **Preview production build**:
   ```bash
   npm run preview
   ```

## 📖 Usage

1. Open the app in your browser (typically `http://localhost:5173`)
2. Click "Start Registration" on the home page
3. Select your role in Stage 1
4. Fill in role-specific details in Stage 2
5. Provide email and agree to terms in Stage 3
6. View success confirmation and collected data
7. Click "Go to Dashboard Home" to reset and start over

## 🔧 Configuration

### Adding New Roles

1. Update `StateContext.jsx` fieldCompleted arrays if needed
2. Create new role component in `components/Roles/`
3. Add role option in `Stage1.jsx`
4. Update `Stage2.jsx` to render new role component

### Modifying Progress Colors

Edit `colorRules.json` to change color ranges and classes.

### Scaling Stages

The system is designed to be extensible:

- Add new stages by extending `fieldCompleted` object
- Update `calculateProgress` function for new stage weights
- Create new stage components and routes

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.
