"use client";

import { useGetOfferedCourseSectionQuery } from "@/redux/features/offeredCourseSection/offeredCourseSectionApi";

export default function paget() {
  const { data } = useGetOfferedCourseSectionQuery();
  //console.log(data);
  return <div>paget</div>;
}
