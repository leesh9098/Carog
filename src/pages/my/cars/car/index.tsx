import { useParams } from "react-router-dom";

export default function Car() {
    const { id } = useParams();

    return (
        <div className="p-4">
            <h1>Car</h1>
        </div>
    )
}
