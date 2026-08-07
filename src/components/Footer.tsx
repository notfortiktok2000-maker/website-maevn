export default function Footer() {
  return (
    <footer id="contact" className="bg-white text-[#0a0a0a] pt-24 pb-12 border-t border-gray-100">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 mb-24">
          <div>
            <h3 className="text-[10px] font-medium uppercase tracking-[0.3em] mb-8 text-gray-400">Contact Us</h3>
            <div className="flex flex-col space-y-5 text-xs font-medium uppercase tracking-widest">
              <a href="#" className="hover:text-gray-500 transition-colors">Instagram</a>
              <a href="https://wa.me/212710900502" className="hover:text-gray-500 transition-colors">WhatsApp</a>
              <a href="#" className="hover:text-gray-500 transition-colors">Email</a>
            </div>
          </div>
          <div>
            <h3 className="text-[10px] font-medium uppercase tracking-[0.3em] mb-8 text-gray-400">Newsletter</h3>
            <form className="flex border-b border-gray-200 pb-4 group focus-within:border-[#0a0a0a] transition-colors">
              <input 
                type="email" 
                placeholder="Email address" 
                className="w-full outline-none text-xs placeholder-gray-400 bg-transparent uppercase tracking-wider font-medium"
              />
              <button type="submit" className="text-[10px] font-medium uppercase tracking-[0.2em] pl-6 hover:opacity-50 transition-opacity">
                Subscribe
              </button>
            </form>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-12 border-t border-gray-100 text-[9px] uppercase tracking-[0.2em] text-gray-400 font-medium">
          <div>&copy; {new Date().getFullYear()} MAEVN WATCHES. All rights reserved.</div>
          <div className="flex gap-8">
            <a href="#" className="hover:text-[#0a0a0a] transition-colors">Legal</a>
            <a href="#" className="hover:text-[#0a0a0a] transition-colors">Privacy</a>
            <a href="#" className="hover:text-[#0a0a0a] transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
