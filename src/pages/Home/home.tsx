
export default function Home() {
    const buttons: {
        id: number;
        name: string;
    }[] = [
        {
            id: 1,
            name: '정비내역',
        },
        {
            id: 2,
            name: '유류비',
        },
        {   
            id: 3,
            name: '보험료/세금',
        },
        {   
            id: 4,
            name: '사고',   
        },
        {   
            id: 5,
            name: '할부',   
        },
        {   
            id: 6,
            name: '꾸미기',
        },
        {
            id: 7,
            name: '주차비', 
        }
    ]

    const buttonList = buttons.map((button) => (
        <div 
            key={button.id} 
            className="flex flex-col items-center"
        >
        <div className="w-10 h-10 bg-gray-200 rounded-full">
            {/* <img src={button.image} alt={button.name} /> */}
        </div>
        <span
            className="mt-2 text-center text-sm font-medium"
        >
            {button.name}
        </span>
        </div>
    ))
  return (
        <div className="flex gap-16 p-4">
            {buttonList}
        </div>
  );
}