import Link from "next/link";

export default function Home() {
  return (
    <>
      <section className="min-h-[80vh] flex items-center pt-[140px]">
        <div className="max-w-[1200px] w-full mx-auto px-10">
          <div className="max-w-[800px] animate-fade-in">
            <span className="inline-block text-[0.85rem] tracking-widest uppercase text-terracotta font-semibold mb-4">
              Welcome to DevnCode
            </span>
            <h1 className="text-6xl mb-6 font-space-grotesk font-semibold leading-tight">
              Building the future of <br />
              <em className="text-terracotta italic">
                Software Engineering
              </em>{" "}
              in Pakistan.
            </h1>
            <p className="text-xl max-w-[600px] mb-6 text-[#4a4a4a] leading-relaxed">
              Cultivating talent, fostering collaboration, and opening doors for
              the next generation.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-[1200px] w-full mx-auto px-10">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-[1fr_2fr]">
            <div>
              <h2 className="text-3xl text-terracotta font-space-grotesk font-semibold leading-tight mb-4">
                Our Mission
              </h2>
            </div>
            <div>
              <p className="text-3xl font-medium text-custom-black mb-6 leading-relaxed">
                To empower emerging talent and strengthen tech communities
                across Pakistan.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-black/[0.03]">
        <div className="max-w-[1200px] w-full mx-auto px-10">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-[1fr_2fr]">
            <div>
              <h2 className="text-3xl text-terracotta font-space-grotesk font-semibold leading-tight mb-4">
                Who We Are
              </h2>
            </div>
            <div>
              <span className="inline-block text-[0.85rem] tracking-widest uppercase font-semibold mb-6 text-custom-black border border-current py-1 px-3 rounded-[20px]">
                Empowerment
              </span>
              <p className="mb-6 text-[#4a4a4a] leading-relaxed">
                DevnCode was built with one clear purpose:{" "}
                <strong>Empowerment</strong>. We focus on supporting both
                individuals and communities who are eager to grow in the IT
                domain—especially in Software Engineering.
              </p>
              <p className="mb-6 text-[#4a4a4a] leading-relaxed">
                Over time, DevnCode has helped multiple tech communities launch
                their chapters across Pakistan and organized several signature
                events. Through mentorship, collaboration, and knowledge
                sharing, we aim to create real impact.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 text-center">
        <div className="max-w-[1200px] w-full mx-auto px-10">
          <h2 className="font-space-grotesk font-semibold leading-tight mb-4">
            Ready to grow with us?
          </h2>
          <Link
            href="#"
            className="inline-block bg-custom-black text-white px-8 py-3.5 rounded-full font-medium transition-all duration-200 hover:bg-terracotta hover:-translate-y-0.5 mt-6"
          >
            Become a Member
          </Link>
        </div>
      </section>
    </>
  );
}
