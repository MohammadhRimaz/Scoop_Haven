import Hero from "./Components/Layouts/Hero";
import HomeMenu from "./Components/Layouts/HomeMenu";
import SectionHeaders from "./Components/Layouts/SectionHeaders";

export default function Home() {
  return (
    <>
      {/* To run the project type npm run dev in the terminal */}

      {/* Imported the Each section from layout folder */}
      {/* Home Page */}
      <Hero />

      {/* Menu Section */}
      <HomeMenu />

      {/* About Section */}
      <section className="text-center my-16" id="about">
        <SectionHeaders subHeader={"Our Story"} mainHeader={"About us"} />
        <div className="max-w-2xl mx-auto text-gray-500 mt-4 flex flex-col gap-4 ">
          <p>
            Welcome to Scoop Haven, where every scoop tells a story of flavor,
            indulgence, and pure delight! Our mission is simple: to bring joy
            through a rich variety of premium ice creams crafted with the finest
            ingredients. From our Fruit Fusion category, brimming with
            refreshing real fruit flavors, to our Cone Delights, offering
            classic and unique combinations, each treat is made to satisfy every
            craving.
          </p>
          <p>
            For those looking for something a little extra, our Ice Cream Bars
            are dipped, layered, and topped to perfection, while our Sandwich
            Sensations bring beloved flavors together between delicious cookie
            layers. And for the ultimate indulgence, our Premium Indulgences
            feature artisanal buckets and decadent ice cream sticks, including
            the luxuriously adorned Golden Vanilla cup.
          </p>
          <p>
            At Scoop Haven, we believe ice cream is more than just dessert -
            it&apos;s an experience, a moment of joy, and a treat to share with
            loved ones. Whether you’re a fan of rich chocolate, vibrant fruits,
            or nutty crunches, we’ve got a scoop (or two) waiting for you. Come,
            explore our flavors, and find your haven of sweetness with every
            bite!
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="text-center my-8" id="contact">
        <SectionHeaders
          subHeader={"Don't Hesitate"}
          mainHeader={"Contact us"}
        />
        <div className="mt-3">
          <a
            className="text-4xl underline text-gray-500"
            href="tel:+94952954958"
          >
            +94 952 954 958
          </a>
        </div>
      </section>
    </>
  );
}
