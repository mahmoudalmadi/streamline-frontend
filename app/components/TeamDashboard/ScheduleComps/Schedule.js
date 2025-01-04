import React, { useEffect, useState } from "react";
import Scheduler, { SchedulerData, ViewTypes, DATE_FORMAT } from "react-big-scheduler";
import "react-big-scheduler/lib/css/style.css";
import moment from "moment";

const SwimClubScheduler = () => {
  const [schedulerData, setSchedulerData] = useState(
    new SchedulerData(moment().format(DATE_FORMAT), ViewTypes.Week, false, false, {
      resourceName: "Swim Lanes", // Header for resources
      schedulerWidth: "100%",
      schedulerMaxHeight: 800,
      dayResourceTableWidth: 160,
      views: [
        { viewName: "Week", viewType: ViewTypes.Week, showAgenda: false, isEventPerspective: false },
      ],
    })
  );

  useEffect(() => {
    // Set resources (e.g., swim lanes)
    schedulerData.setResources([
      { id: "lane1", name: "Lane 1" },
      { id: "lane2", name: "Lane 2" },
      { id: "lane3", name: "Lane 3" },
    ]);

    // Set events (e.g., swim lessons)
    schedulerData.setEvents([
      {
        id: 1,
        start: moment().add(1, "hours").format("YYYY-MM-DD HH:mm:ss"),
        end: moment().add(2, "hours").format("YYYY-MM-DD HH:mm:ss"),
        resourceId: "lane1",
        title: "Swim Lesson - Beginner",
      },
      {
        id: 2,
        start: moment().add(3, "hours").format("YYYY-MM-DD HH:mm:ss"),
        end: moment().add(4, "hours").format("YYYY-MM-DD HH:mm:ss"),
        resourceId: "lane2",
        title: "Swim Lesson - Advanced",
      },
    ]);

    setSchedulerData(schedulerData);
  }, []);

  return (
    <div className="w-full h-[800px] border bg-gray-100">
      <Scheduler
        schedulerData={schedulerData}
        prevClick={(schedulerData) => {
          schedulerData.prev();
          setSchedulerData(schedulerData);
        }}
        nextClick={(schedulerData) => {
          schedulerData.next();
          setSchedulerData(schedulerData);
        }}
        onSelectDate={(schedulerData, date) => {
          schedulerData.setDate(date);
          setSchedulerData(schedulerData);
        }}
        onViewChange={(schedulerData, view) => {
          schedulerData.setViewType(view.viewType, view.showAgenda, view.isEventPerspective);
          setSchedulerData(schedulerData);
        }}
        eventItemClick={(schedulerData, event) => {
          alert(`Clicked on event: ${event.title}`);
        }}
      />
    </div>
  );
};

export default SwimClubScheduler;
