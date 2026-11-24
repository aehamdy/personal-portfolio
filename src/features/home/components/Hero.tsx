import { Heading } from "@/components/ui/heading";
import type { Profile } from "@/features/profile/types/profile.types";
import LetterGlitch from "../../../components/LetterGlitch";

type HeroProps = {
  profile: Profile;
};

export default function Hero({ profile }: HeroProps) {
  const { role, firstName, lastName, tagline } = profile;
  const fullName = `${firstName} ${lastName}`;

  return (
    <section className="relative flex justify-center w-full h-dvh mx-auto overflow-hidden">
      <div className="absolute top-20 flex flex-col justify-between items-center w-full md:w-[96%] lg:w-[90%] h-full p-8 md:p-12 border-4 border-accent rounded-5xl overflow-hidden">
        <div className="flex flex-col-reverse md:flex-col justify-between items-center gap-20 w-full z-5">
          <p className="w-full lg:w-1/2 uppercase font-light text-[0.8125rem] text-center text-muted">
            {tagline}
          </p>

          <div className="flex flex-col items-center gap-6 md:gap-3 mt-28 md:mt-0">
            <Heading
              as="h3"
              weight="bold"
              className="uppercase text-[7vh] md:text-[10vh] lg:text-[12vh] tracking-wide bg-background/10 backdrop-blur-xs rounded-full"
            >
              {fullName}
            </Heading>

            <Heading
              as="h1"
              weight="bold"
              className="uppercase text-center text-[15vh] md:text-[25vh] lg:text-[35vh] text-accent tracking-wide"
            >
              {role}
            </Heading>
          </div>
        </div>

        <div
          className="bg-surface"
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
            top: 0,
          }}
        >
          <LetterGlitch
            glitchColors={["#ffffff", "#61dca3"]}
            glitchAmount={0.5}
            speed={0.3}
            flow={0.1}
            clickEffect="tear"
            baseColor="#ffffff"
            fontSize={14}
            spacing={0.6}
            density={0.9}
            baseOpacity={0.1}
            smooth
            edgeFade={0}
            centerFade={0}
            interactive
            cursorRadius={140}
            intro
            lightMode={false}
            backgroundColor=""
            dpr={10}
            style={{}}
          />
        </div>
      </div>
    </section>
  );
}
