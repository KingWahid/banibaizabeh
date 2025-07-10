
import Hero from "./components/hero";


export default function Home() {
  return (
     <div className="min-h-screen bg-[#F9E4BC] relative transition-colors duration-300 isolate">
      <div className="absolute inset-0 -z-10">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.05) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        ></div>
      </div>
      {/* <Navbar /> */}
      <Hero />
    </div>
  );
}