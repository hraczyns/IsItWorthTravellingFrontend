import {useCookies} from "react-cookie";
import {useEffect} from "react";
import './css/userHistory.css';
import {useHistory} from "react-router-dom";

const MAX_LENGTH = 10;

const UserHistory = ({placeName, latLng, timestamp, onNavigateClick}) => {
    const [cookies, setCookie] = useCookies(["userHistory"]);
    const history = useHistory();
    useEffect(() => {
        if (placeName) {
            const value = `${placeName}=${latLng.lng};${latLng.lat}=${timestamp.replace("T", " ")}`;
            const userHistory = cookies?.userHistory || [];
            while (userHistory.length >= MAX_LENGTH) {
                userHistory.shift();
            }
            if (userHistory.every(v => v.split("=")[2] !== timestamp)) {
                setCookie("userHistory", [...userHistory, value]);
            }
        }
    }, [cookies?.userHistory, latLng.lat, latLng.lng, placeName, setCookie, timestamp])

    const getValues = () => {
        const values = cookies?.userHistory || [];
        return values.map((v, i) => {
            const placeCoordsTime = v.split("=");
            const place = placeCoordsTime[0];
            const coords = placeCoordsTime[1].split(";");
            const lng = coords[0];
            const lat = coords[1];
            const seen = placeCoordsTime[2];
            return <tr key={i} className={"user-history-item"}>
                <td>{i + 1}.</td>
                <td>{place}</td>
                <td>{seen}</td>
                <td>
                    <button onClick={() => {
                        onNavigateClick && onNavigateClick();
                        history.push("/results", {lat: lat, lng: lng})
                    }}>Navigate</button>
                    <button onClick={() => deleteItem(i)}>Delete</button>
                </td>
            </tr>
        })
    }

    const deleteItem = (index) => {
        let userHistory = cookies?.userHistory || [];
        userHistory = userHistory.filter((value, i) => i !== index);
        setCookie("userHistory", userHistory);
    }

    return <main>
        <table className={"user-history-table"}>
            <thead>
            <tr>
                <th/>
                <th>Localization</th>
                <th>When seen</th>
                <th>Action</th>
            </tr>
            </thead>
            <tbody>
            {getValues()}
            </tbody>
        </table>
    </main>
}

export default UserHistory;