import Image from "next/image";
import Right from "../Icons/Right";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="hero md:mt-4">
      <div className="py-8 md:py-10">
        <h1 className="text-4xl font-semibold">
          Sweeten your day,
          <br />
          one scoop at
          <br /> a&nbsp;
          <span className="text-primary">Time!</span>
        </h1>
        <p className="my-4 text-gray-500 text-base">
          Welcome to Scoop Haven, where every visit is a delicious adventure!
          Indulge in our handcrafted ice creams, made with love and the finest
          ingredients. From classic favorites to bold, unique flavors, there's a
          perfect scoop for everyone. Treat yourself to a sweet escape today!
        </p>
        <div className="flex gap-4 text-base">
          <button className="bg-primary justify-center text-white px-4 py-2 rounded-full">
            <Link className="flex gap-2 items-center" href={"/menu"}>
              Order&nbsp;Now
              {/* importing an arrow icon inside the button */}
              <Right />
            </Link>
          </button>
          <button className="flex border-0 items-center gap-2 py-2 text-gray-600 text-semibold">
            <Link href={"/#about"}>Learn More</Link>
          </button>
        </div>
      </div>
      <div className="relative hidden md:block">
        <Image
          src={"/Hero-Image.png"}
          layout={"fill"}
          objectFit={"contain"}
          alt={"Ice-cream"}
        />
      </div>
    </section>
  );
}
