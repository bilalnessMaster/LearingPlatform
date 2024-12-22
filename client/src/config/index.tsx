export type FormControl = {
    name: string; // Name attribute for the input
    label: string; // Label for the form field
    placeholder: string; // Placeholder for the input field
    type: string; // Input type (e.g., text, email, password)
    componentType: string; // The type of component to render (e.g., input, textarea)
};
  
export type optionsType  = { label: string; id: string }
export const SignUpformControls:FormControl[] = [
    {
        name : 'username' ,
        label : 'Username',
        placeholder : 'Enter your user name',
        type : 'text', 
        componentType : 'input'
    },
    {
        name : 'email' ,
        label : 'Email',
        placeholder : 'Enter your user email',
        type : 'email', 
        componentType : 'input'
    },
    {
        name : 'password' ,
        label : 'Password',
        placeholder : 'Enter your user password',
        type : 'password', 
        componentType : 'input'
    }
]
export const SignInformControls:FormControl[] = [ 
   {
        name : 'email' ,
        label : 'Email',
        placeholder : 'Enter your user email',
        type : 'email', 
        componentType : 'input'
    },
    {
        name : 'password' ,
        label : 'Password',
        placeholder : 'Enter your user password',
        type : 'password', 
        componentType : 'input'
    }
]
export const languageOptions:optionsType[] = [
    { id: "english", label: "English" },
    { id: "spanish", label: "Spanish" },
    { id: "french", label: "French" },
    { id: "german", label: "German" },
    { id: "chinese", label: "Chinese" },
    { id: "japanese", label: "Japanese" },
    { id: "korean", label: "Korean" },
    { id: "portuguese", label: "Portuguese" },
    { id: "arabic", label: "Arabic" },
    { id: "russian", label: "Russian" },
  ];
  
  export const courseLevelOptions: optionsType[]  = [
    { id: "beginner", label: "Beginner" },
    { id: "intermediate", label: "Intermediate" },
    { id: "advanced", label: "Advanced" },
  ];
  
  export const courseCategories: optionsType[]  = [
    { id: "web-development", label: "Web Development" },
    { id: "backend-development", label: "Backend Development" },
    { id: "data-science", label: "Data Science" },
    { id: "machine-learning", label: "Machine Learning" },
    { id: "artificial-intelligence", label: "Artificial Intelligence" },
    { id: "cloud-computing", label: "Cloud Computing" },
    { id: "cyber-security", label: "Cyber Security" },
    { id: "mobile-development", label: "Mobile Development" },
    { id: "game-development", label: "Game Development" },
    { id: "software-engineering", label: "Software Engineering" },
  ];
  
  export const courseLandingPageFormControls = [
    {
      name: "title",
      label: "Title",
      componentType: "input",
      type: "text",
      placeholder: "Enter course title",
    },
    {
      name: "category",
      label: "Category",
      componentType: "select",
      type: "text",
      placeholder: "",
      options: courseCategories,
    },
    {
      name: "level",
      label: "Level",
      componentType: "select",
      type: "text",
      placeholder: "",
      options: courseLevelOptions,
    },
    {
      name: "language",
      label: "Primary Language",
      componentType: "select",
      type: "text",
      placeholder: " ",
      options: languageOptions,
    },
    {
      name: "subtitle",
      label: "Subtitle",
      componentType: "input",
      type: "text",
      placeholder: "Enter course subtitle",
    },
    {
      name: "description",
      label: "Description",
      componentType: "textarea",
      type: "text",
      placeholder: "Enter course description",
    },
    {
      name: "pricing",
      label: "Pricing",
      componentType: "input",
      type: "number",
      placeholder: "Enter course pricing",
    },
    {
      name: "objectives",
      label: "Objectives",
      componentType: "textarea",
      type: "text",
      placeholder: "Enter course objectives",
    },
    {
      name: "welcomeMessage",
      label: "Welcome Message",
      componentType: "textarea",
      placeholder: "Welcome message for students",
    },
  ];
  
  export const courseLandingInitialFormData = {
    title: "",
    category: "",
    level: "",
    primaryLanguage: "",
    subtitle: "",
    description: "",
    pricing: "",
    objectives: "",
    welcomeMessage: "",
    image: "",
  };
  
  export const courseCurriculumInitialFormData = [
    {
      title: "",
      videoUrl: "",
      freePreview: false,
      public_id: "",
    },
  ];
  
  export const sortOptions = [
    { id: "price-lowtohigh", label: "Price: Low to High" },
    { id: "price-hightolow", label: "Price: High to Low" },
    { id: "title-atoz", label: "Title: A to Z" },
    { id: "title-ztoa", label: "Title: Z to A" },
  ];
  
  export const filterOptions = {
    category: courseCategories,
    level: courseLevelOptions,
    primaryLanguage: languageOptions,
  };