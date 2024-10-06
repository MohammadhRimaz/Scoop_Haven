import Image from "next/image";
import Right from "../Icons/Right";

export default function Hero() {
  return (
    <section className="hero mt-4">
      <div className="py-10">
        <h1 className="text-4xl font-semibold">
          Sweeten your day,
          <br />
          one scoop at
          <br /> a&nbsp;
          <span className="text-primary">Time!</span>
        </h1>
        <p className="my-4 text-gray-500 text-sm">
          Welcome to Scoop Haven, where every visit is a delicious adventure!
          Indulge in our handcrafted ice creams, made with love and the finest
          ingredients. From classic favorites to bold, unique flavors, there's a
          perfect scoop for everyone. Treat yourself to a sweet escape today!
        </p>
      </div>
      <div className="relative">
        <Image
          src={"/Hero-Image.png"}
          layout={"fill"}
          objectFit={"contain"}
          alt={"Ice-cream"}
        />
      </div>
      <div className="flex gap-4 text-sm">
        <button className="bg-primary flex justify-center gap-2 items-center text-white px-4 py-2 rounded-full">
          Order Now
          {/* importing an arrow icon inside the button */}
          <Right />
        </button>
        <button className="flex border-0 items-center gap-2 py-2 text-gray-600 text-semibold">
          Learn More
          {/* importing an arrow icon inside the button */}
          <Right />
        </button>
      </div>
    </section>
  );
}
