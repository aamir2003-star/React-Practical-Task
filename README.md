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

- Uses React Router for client-side routing
- Protected navigation: Can only proceed to next stage when current is valid
- Success page redirects automatically to home

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
