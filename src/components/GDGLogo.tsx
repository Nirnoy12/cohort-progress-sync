const GDGLogo = ({ className = "h-8 w-8" }: { className?: string }) => {
  return (
    <svg className={className} viewBox="0 0 192 192" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="96" cy="96" r="88" fill="white"/>
      <path d="M96 40C73.9086 40 56 57.9086 56 80V112C56 134.091 73.9086 152 96 152C118.091 152 136 134.091 136 112V96H96V116H116V112C116 123.046 107.046 132 96 132C84.9543 132 76 123.046 76 112V80C76 68.9543 84.9543 60 96 60C101.861 60 107.174 62.5829 110.8 66.6L126 54C118.394 44.8571 107.8 40 96 40Z" fill="#4285F4"/>
      <path d="M156 76H136V96H116V116H136V136H156V116H176V96H156V76Z" fill="#EA4335"/>
      <circle cx="46" cy="146" r="10" fill="#34A853"/>
      <circle cx="146" cy="46" r="10" fill="#FBBC04"/>
    </svg>
  );
};

export default GDGLogo;
