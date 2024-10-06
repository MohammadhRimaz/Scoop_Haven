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
      <section className="text-center my-16">
        <SectionHeaders subHeader={"Our Story"} mainHeader={"About us"} />
        <div className="max-w-md mx-auto text-gray-500 mt-4 flex flex-col gap-4 ">
          <p>
            loremjsoldj o;aero eoahr hkdf kda; hklshadoleh aslkhrj fkheirg
            vbx,jrgeirg bx asdh;qwoa mbx igeri
          </p>
          <p>
            dsafuewdgrfsbxcjgwweudir rujewgw uwgr xzjcv ielr rgaidsri 8eaqjg
            rlsgd; gas;g ieqg rxgzzxkgfl ases wew
          </p>
          <p>
            dsafuewdgrfsbxcjgwweudir rujewgw uwgr xzjcv ielr rgaidsri 8eaqjg
            rlsgd; gas;g ieqg rxgzzxkgfl ases wew
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="text-center my-8">
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
