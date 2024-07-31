const SkeletonOne = () => {
    return (
        <div>
            <p className="font-bold md:text-4xl text-xl text-white">Fast and Reliable Trains</p>
            <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
                Experience the speed and efficiency of Indian Railways, connecting cities across India seamlessly.
            </p>
        </div>
    );
};

const SkeletonTwo = () => {
    return (
        <div>
            <p className="font-bold md:text-4xl text-xl text-white">Vibrant Routes</p>
            <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
                Explore diverse landscapes with Indian Railways extensive network of routes throughout the country.
            </p>
        </div>
    );
};

const SkeletonThree = () => {
    return (
        <div>
            <p className="font-bold md:text-4xl text-xl text-white">Comfortable Travel</p>
            <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
                Enjoy comfortable and affordable travel with Indian Railways, catering to all passenger needs.
            </p>
        </div>
    );
};

const SkeletonFour = () => {
    return (
        <div>
            <p className="font-bold md:text-4xl text-xl text-white">Scenic Journeys</p>
            <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
                Witness Indias beauty unfold with Indian Railways scenic train journeys through picturesque regions.
            </p>
        </div>
    );
};
export const words = [
    {
        text: "Serach",
        className: "text-white",
    },
    {
        text: "your",
        className: "text-white",
    },
    {
        text: "trains",
        className: "text-white",
    },
    {
        text: "with",
        className: "text-white",
    },
    {
        text: "Tourism.",
        className: "text-blue-500 dark:text-blue-500",
    },
];

export const TrainCards = [
    {
        id: 1,
        content: <SkeletonOne />,
        className: "md:col-span-2",
        thumbnail: "https://assets.thehansindia.com/h-upload/2023/06/26/1360811-vande-bharat-express-train.jpg",
    },
    {
        id: 2,
        content: <SkeletonTwo />,
        className: "col-span-1",
        thumbnail: "https://www.financialexpress.com/wp-content/uploads/2019/10/Vande-Bharat-12-1.jpg?w=350",
    },
    {
        id: 3,
        content: <SkeletonThree />,
        className: "col-span-1",
        thumbnail: "https://images.news18.com/ibnlive/uploads/2023/07/untitled-22.jpg",
    },
    {
        id: 4,
        content: <SkeletonFour />,
        className: "md:col-span-2",
        thumbnail: "https://st2.indiarailinfo.com/kjfdsuiemjvcya1/0/2/4/9/4893249/0/img356914747840.jpg",
    },
];
export const FlightCards = [
    {
        id: 1,
        content: <SkeletonOne />,
        className: "md:col-span-2",
        thumbnail: "https://cdn.plnspttrs.net/14144/a6-edg-emirates-airbus-a380-861_PlanespottersNet_248136_c2eccd0f74_o.jpg",
    },
    {
        id: 2,
        content: <SkeletonTwo />,
        className: "col-span-1",
        thumbnail: "https://cdn.i-scmp.com/sites/default/files/images/methode/2019/02/28/f940c736-3999-11e9-a334-8d034d5595df_1320x770_095747.JPG",
    },
    {
        id: 3,
        content: <SkeletonThree />,
        className: "col-span-1",
        thumbnail: "https://www.primenewsghana.com/images/2019/dec/15/why_put_your_flight_in_airplane_mode.jpg",
    },
    {
        id: 4,
        content: <SkeletonFour />,
        className: "md:col-span-2",
        thumbnail: "https://upgradedpoints.com/wp-content/uploads/2022/12/Airbus-A380.jpg?auto=webp&disable=upscale&width=1200",
    },
];