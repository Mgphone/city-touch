import aboutSvg from "../assets/about.svg";
import { Statistics } from "./Statistics";

export const About = () => {
  return (
    <section
      id="about"
      className="bg-background dark:bg-gray-900 py-5 sm:py-20"
    >
      <div className="w-[90%] mx-auto px-4 sm:px-6 lg:px-8 ">
        <div className="bg-muted/50 border rounded-lg py-12">
          <div className="px-6 flex flex-col-reverse md:flex-row gap-8 md:gap-12 items-center md:items-center">
            <img
              src={aboutSvg}
              alt="City Touch team helping with removals"
              className="w-full max-w-[300px] object-contain rounded-lg"
            />
            <div className="flex flex-col justify-between text-left max-w-full">
              <div className="pb-6">
                <h2 className="text-3xl sm:text-4xl font-bold">
                  <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
                    About{" "}
                  </span>
                  <span className="bg-gradient-to-b from-indigo-400 to-purple-600 text-transparent bg-clip-text">
                    City Touch
                  </span>
                </h2>
                <p className="text-lg sm:text-xl text-muted-foreground mt-4 leading-relaxed">
                  At <strong>City Touch</strong>, we pride ourselves on offering
                  top-quality removal services at the most competitive prices in
                  the market. We’re confident that we can match or beat any
                  quote from other companies without compromising on service.
                  <br />
                  <br />
                  Our mission is simple:{" "}
                  <strong>make our customers happy</strong>. Whether you're
                  moving across the street or across the city, our friendly,
                  reliable team ensures a smooth and stress-free experience from
                  start to finish.
                </p>
              </div>
              <div className="text-muted-foreground text-base">
                <p className="mt-4 leading-relaxed">
                  📍 Based in London
                  <br />
                  📞{" "}
                  <a href="tel:+447738518821" className="underline">
                    +44 7738 518821
                  </a>
                  <br />
                  📧{" "}
                  <a
                    href="mailto:phonemyintnaing@gmail.com"
                    className="underline"
                  >
                    phonemyintnaing@gmail.com
                  </a>
                </p>
              </div>
              <div className="mt-8">
                <Statistics />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
