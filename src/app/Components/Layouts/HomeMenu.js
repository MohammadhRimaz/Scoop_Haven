import Image from "next/image";
import MenuItem from "../Menu/MenuItem";
import SectionHeaders from "./SectionHeaders";
export default function HomeMenu() {
    return (
        <section>
            <div className="absolute left-0 right-0 w-full justify-start">
                <div className="absolute left-0 -top-[65px] text-left -z-10">
                    <Image src={'/Melting Cream.png'} alt={'Venilla'} width={200} height={200} />
                </div>
                <div className="absolute right-0 top-[10px] -z-10">
                    <Image src={'/Chocolate.png'} alt={'Chocolate'} width={200} height={200} />
                </div>
            </div>
            <div className="text-center my-10">
                <SectionHeaders 
                    subHeader={'check out'}
                    mainHeader={'menu'} />
            </div>
            <div className="grid grid-cols-3 gap-4">
                {/* Imported Menu Item's code from Menu folder. */}
                <MenuItem />
                <MenuItem />
                <MenuItem />
                <MenuItem />
                <MenuItem />
                <MenuItem />
            </div>
        </section>
    );
}