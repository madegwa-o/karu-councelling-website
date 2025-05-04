import {useParams} from "react-router-dom";


export default function Member() {
    const params = useParams();
    return (
        <div className="page-wrapper">
            <h1>Hi im a {params.member}</h1>
        </div>
    )
}
