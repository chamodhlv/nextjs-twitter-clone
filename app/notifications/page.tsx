"use client";
import { useState, useEffect } from "react";
import { NotificationSkeleton } from "@/components/NotificationSkeleton";
import { getNotifications } from "@/actions/notification.action";

type Notification = Awaited<ReturnType<typeof getNotifications>>;

function NotificationsPage() {
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {};
  }, []);

  if (isLoading) return <NotificationSkeleton />;

  return <div>NotificationSkelo</div>;
}

export default NotificationsPage;
