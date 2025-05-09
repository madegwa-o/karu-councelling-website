import React, {useCallback, useEffect, useState} from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuthentication } from "../../hooks/AuthenticationContext.tsx";
import { Modal, Button } from "react-bootstrap"; // Assuming Bootstrap is installed
import styles from './counsellors.module.css';

export enum Role {
    MAINCOUNSELLOR,
    PEERCOUNSELLOR,
}

export default function Counsellors() {

    const { role } = useParams();
    const { baseUrl } = useAuthentication();
    const navigate = useNavigate();
    const [nextPageUrl, setNextPageUrl] = useState(`${baseUrl}/api/v1/users/by-role?role=${role}&page=0&size=10`);
    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [counsellors, setCounsellors] = useState<any[]>([]);
    const [selectedCounsellor, setSelectedCounsellor] = useState(null);
    const [slots, setSlots] = useState([]);
    const [showModal, setShowModal] = useState(false);


    const fetchCounsellorsByRole = async (category: string, pageNumber: number) => {
        try {
            const response = await fetch(
                ``
            );
            if (!response.ok) {
                throw new Error("Failed to fetch counsellors");
            }
            const data = await response.json();
            setCounsellors(data._embedded.userList || []);
        } catch (error) {
            console.error("Error fetching counsellors:", error);
        }
    };

    const fetchAvailableSlots = async (counsellorId: string) => {
        try {
            const response = await fetch(`${baseUrl}/api/v1/sessions/slots?counsellorId=${counsellorId}`);
            if (!response.ok) {
                throw new Error("Failed to fetch slots");
            }
            const data = await response.json();
            setSlots(data.slots || []);
            setShowModal(true);
        } catch (error) {
            console.error("Error fetching slots:", error);
        }
    };

    const bookSlot = async (slotId: string) => {
        try {
            const response = await fetch(`${baseUrl}/api/v1/sessions/book`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ slotId }),
            });
            if (!response.ok) {
                throw new Error("Booking failed");
            }
            alert("Session booked successfully!");
            setShowModal(false);
        } catch (error) {
            console.error("Error booking session:", error);
        }
    };



    // Fetch Feeds Function
    const fetchCouncellors = useCallback(async () => {
        if (!nextPageUrl || isLoading) return;

        setIsLoading(true);
        try {
            const response = await fetch(nextPageUrl);
            const data = await response.json();

            setCounsellors((prevCuonsellors) => [...prevCuonsellors, ...data._embedded.userList]);
            setNextPageUrl(data._links.next?.href || null);
            setHasMore(!!data._links.next);
        } catch (error) {
            console.error('Error fetching Councellors:', error);
        } finally {
            setIsLoading(false);
        }
    }, [nextPageUrl, isLoading]);

    // Intersection Observer for Endless Scrolling
    const observer = useCallback((node) => {
        if (isLoading) return;

        const handleObserver = (entries) => {
            if (entries[0].isIntersecting && hasMore) {
                fetchCouncellors();
            }
        };

        const options = { threshold: 1.0 };
        const intersectionObserver = new IntersectionObserver(handleObserver, options);

        if (node) intersectionObserver.observe(node);

        return () => {
            if (node) intersectionObserver.unobserve(node);
        };
    }, [fetchCouncellors, isLoading, hasMore]);



    useEffect(() => {
        if (role === "new") {
            navigate("/register");
        } else {
            setNextPageUrl(`${baseUrl}/api/v1/users/by-role?role=${role}&page=0&size=10`);
            fetchCouncellors(); // Initial fetch
        }
    }, [role, navigate]);

    return (
        <div>
            <h1>{role ? `${role.charAt(0).toUpperCase()}${role.slice(1)} Counsellors` : "Counsellors"}</h1>
            <div className={styles.counsellorGrid}>
                {counsellors.map((counsellor) => (
                    <div key={counsellor.userId} className={styles.counsellorCard}>
                        <h2>{counsellor.firstName} {counsellor.lastName}</h2>
                        <p>{counsellor.schoolEmail}</p>
                        <Button
                            onClick={() => {
                                setSelectedCounsellor(counsellor);
                                fetchAvailableSlots(counsellor.userId);
                            }}
                        >
                            Book
                        </Button>
                    </div>
                ))}

                {isLoading && <div className={styles.loader}>Loading...</div>}

                {/* Trigger for Intersection Observer */}
                <div ref={observer} style={{ height: '20px' }} />
            </div>

            {/* Modal for Booking */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Book a Session with {selectedCounsellor?.firstName}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {slots.length > 0 ? (
                        <div className={styles.slotGrid}>
                            {slots.map((slot) => (
                                <Button key={slot.id} onClick={() => bookSlot(slot.id)}>
                                    {slot.date} {slot.startTime} - {slot.endTime}
                                </Button>
                            ))}
                        </div>
                    ) : (
                        <p>No available slots</p>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
