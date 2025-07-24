import React from "react";

export default function Footer() {
  return (
    <footer className="w-full bg-white border-t mt-20">
      <div className="max-w-5xl mx-auto py-10 px-4 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex flex-col items-center md:items-start">
          <span className="text-xl font-bold text-amber-900 tracking-wide" style={{ fontFamily: "'Quicksand', sans-serif" }}>
            Essentia
          </span>
          <span className="text-sm text-gray-500 mt-1 mb-2">Arte que transforma espacios.</span>
          <span className="text-xs text-gray-400">&copy; {new Date().getFullYear()} Essentia. Todos los derechos reservados.</span>
        </div>
        <div className="flex flex-col items-center md:items-end gap-2">
          <span className="text-sm text-amber-950 font-semibold">Contacto</span>
          <a href="mailto:info@essentia.com" className="text-xs text-gray-500 hover:underline">info@essentia.com</a>
          <a href="tel:+573001234567" className="text-xs text-gray-500 hover:underline">+57 300 123 4567</a>
          <div className="flex gap-4 mt-2">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><path d="M7 2C4.23858 2 2 4.23858 2 7V17C2 19.7614 4.23858 22 7 22H17C19.7614 22 22 19.7614 22 17V7C22 4.23858 19.7614 2 17 2H7ZM12 7.5C14.4853 7.5 16.5 9.51472 16.5 12C16.5 14.4853 14.4853 16.5 12 16.5C9.51472 16.5 7.5 14.4853 7.5 12C7.5 9.51472 9.51472 7.5 12 7.5ZM18 7.75C18.4142 7.75 18.75 8.08579 18.75 8.5C18.75 8.91421 18.4142 9.25 18 9.25C17.5858 9.25 17.25 8.91421 17.25 8.5C17.25 8.08579 17.5858 7.75 18 7.75Z" fill="#a8711d"/></svg>
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><path d="M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.0221 5.65685 21.1087 10.4375 21.8795V14.8906H7.89844V12H10.4375V9.79785C10.4375 7.29077 11.9305 5.9375 14.2068 5.9375C15.2956 5.9375 16.4375 6.125 16.4375 6.125V8.5625H15.2422C14.0664 8.5625 13.5625 9.32122 13.5625 10.125V12H16.3281L15.8828 14.8906H13.5625V21.8795C18.3432 21.1087 22 17.0221 22 12Z" fill="#a8711d"/></svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}