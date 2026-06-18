import { useState, useEffect } from "react";
import axiosClient from "../utils/axiosClient";

export default function Timer({ apiUrl = "/api/event-time" }) {
  const [timeLeft, setTimeLeft] = useState("");
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    let countdownInterval, syncInterval;

    const fetchEventTime = async () => {
      try {
        const res = await axiosClient.get(apiUrl);
        const { serverTime, eventEndTime, status } = res.data;
        setStatus(status);

        if (status === "ended") {
          setTimeLeft("Event Ended");
          clearInterval(countdownInterval);
          return;
        }

        const end = new Date(eventEndTime).getTime();
        const now = new Date(serverTime).getTime();
        let diff = end - now;

        clearInterval(countdownInterval);
        countdownInterval = setInterval(() => {
          diff -= 1000;
          if (diff <= 0) {
            setStatus("ended");
            setTimeLeft("Event Ended");
            clearInterval(countdownInterval);
          } else {
            const hours = Math.floor(
              (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
            );
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);
            setTimeLeft(
              `${hours.toString().padStart(2, "0")}:${minutes
                .toString()
                .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
            );
          }
        }, 1000);
      } catch (error) {
        console.error("Error fetching event time:", error);
        setTimeLeft("Error syncing timer");
      }
    };

    fetchEventTime();
    syncInterval = setInterval(fetchEventTime, 60000);

    return () => {
      clearInterval(syncInterval);
      clearInterval(countdownInterval);
    };
  }, [apiUrl]);

  return (
    <div className="inline-block bg-red-900/40 px-3 py-1 rounded-md border border-red-700/40 text-red-300 text-sm font-mono tracking-wide">
      {status === "loading" ? (
        <span className="text-gray-400">Loading...</span>
      ) : status === "ended" ? (
        <span className="text-gray-400 font-orbi "> Event Ended</span>
      ) : (
        <span className="font-orbi">
          Event Ends In: <span className="text-red-400">{timeLeft}</span>
        </span>
      )}
    </div>
  );
}
