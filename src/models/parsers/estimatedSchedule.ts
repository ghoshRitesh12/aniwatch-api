type EstimatedSchedule = {
  id: string | null;
  time: string | null;
  name: string | null;
  jname: string | null;
};

export type ScrapedEstimatedSchedule = {
  scheduledAnimes: Array<EstimatedSchedule>;
};
