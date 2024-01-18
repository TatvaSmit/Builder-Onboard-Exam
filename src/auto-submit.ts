import _ from "lodash";
import { ExamSessions } from "./models/exam_sessions";
import { TestPerformance } from "./models/test_performance";
import { TestStats } from "./models/test_stats";
import { ExamStatus } from "../common/helper/enum";
import { convertToMilliseconds, getTimeStamps } from "../common/helper/common-functions";

const autoSubmit = async () => {
  const currentTimeStamp = new Date().getTime();
  const examSessions = await ExamSessions.findAll();
  if (_.isEmpty(examSessions)) {
    return;
  }

  _.forEach(examSessions, async (session: ExamSessions) => {
    const { id, user_id, test_id, test_performance_id, duration, start_time } = session;
    const startTimeStamp = getTimeStamps(new Date(start_time));
    const durationTimeStamp = convertToMilliseconds(duration);
    const elapsedTime = _.subtract(currentTimeStamp, startTimeStamp);
    if (elapsedTime >= durationTimeStamp) {
      const testPerformance = await TestPerformance.findByPk(test_performance_id);
      const isExamPending = _.eq(
        _.get(testPerformance, "status", ExamStatus.pending),
        ExamStatus.pending
      );
      if (testPerformance && isExamPending) {
        const testStats = await TestStats.findAll({
          where: { user_id: Number(user_id), test_id: Number(test_id) },
        });
        let score = 0;
        if (testStats) {
          _.forEach(testStats, (testStat: TestStats) => {
            const { selected_answer, correct_answer } = testStat;
            if (_.eq(selected_answer, correct_answer)) {
              score += 1;
            }
          });
          _.assign(testPerformance, { score: score, status: ExamStatus.completed });
        }
        await TestPerformance.update(testPerformance, { where: { id: test_performance_id } });
      }
      await ExamSessions.destroy({ where: { id } });
    }
  });
};

export default autoSubmit;
