import "./ReceiverImpactReport.css";

import React, { useEffect, useRef, useState } from "react";

import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const ReceiverImpactReport = ({ receiverId }) => {
  const [reportData, setReportData] = useState(null);
  const reportRef = useRef(null);

  useEffect(() => {
    const fetchReportData = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/impact/${receiverId}`);
        const data = await res.json();
        setReportData(data);
      } catch (err) {
        console.error("Error fetching impact data:", err);
        setReportData({
          totalDonations: 42,
          totalMealsServed: 1240,
          topContributors: [
            { name: "Tasty Bites", meals: 500 },
            { name: "Green Kitchen", meals: 420 },
            { name: "FoodHub", meals: 320 },
          ],
          lastUpdated: new Date().toLocaleDateString(),
        });
      }
    };

    fetchReportData();
  }, [receiverId]);

  const exportToPDF = () => {
    const input = reportRef.current;
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "px",
        format: [canvas.width, canvas.height],
      });
      pdf.addImage(imgData, "PNG", 0, 0);
      pdf.save("impact-report.pdf");
    });
  };

  if (!reportData) return <p>Loading impact data...</p>;

  return (
    <div className="receiver-impact-report">
      <div className="report-header">
        <h2>Impact Summary</h2>
        <button className="export-btn" onClick={exportToPDF}>Export as PDF</button>
      </div>

      <div ref={reportRef} className="report-content">
        <div className="impact-cards">
          <div className="impact-card">
            <h3>{reportData.totalDonations}</h3>
            <p>Total Donations</p>
          </div>
          <div className="impact-card">
            <h3>{reportData.totalMealsServed}</h3>
            <p>Meals Served</p>
          </div>
          <div className="impact-card">
            <h3>{reportData.topContributors.length}</h3>
            <p>Top Contributors</p>
          </div>
        </div>

        <div className="contributors">
          <h4>Top Contributors</h4>
          <ul>
            {reportData.topContributors.map((c, i) => (
              <li key={i}>
                <strong>{c.name}</strong> - {c.meals} meals
              </li>
            ))}
          </ul>
        </div>

        <p className="updated">Last updated: {reportData.lastUpdated}</p>
      </div>
    </div>
  );
};

export default ReceiverImpactReport;
