export default function MenuItem() {
    return (
        <div className="bg-gray-200 p-4 rounded-lg text-center group hover:bg-white hover:shadow-lg hover:shadow-black/45 transition:all">
            <div className="text-center">
                <img src="/Venilla Cup.png" alt="Venilla Cup" className="max-h-auto max-h-24 block mx-auto" />
            </div>
            <h4 className="font-semibold text-xl my-3">Cream</h4>
            <p className="text-gray-500 text-sm">
                asdgsag daqiwyhe ahylieiwaq
            </p>
            <button className="mt-4 bg-primary text-white rounded-full px-8 py-2">Add to cart $12</button>
        </div>
    );
}