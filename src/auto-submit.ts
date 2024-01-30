import _ from "lodash";
import { ExamSessions } from "./models/exam_sessions";
import { TestPerformance } from "./models/test_performance";
import { TestStats } from "./models/test_stats";
import { ExamStatus } from "../common/helper/enum";
import { convertToMilliseconds, getTimeStamps } from "../common/helper/common-functions";
import { Question } from "./models/question";

const autoSubmit = async () => {
  console.log("****************** scheduler is running ******************");
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
      const isExamPending = _.isEqual(
        _.get(testPerformance, "status", ExamStatus.pending),
        ExamStatus.pending
      );
      if (testPerformance && isExamPending) {
        const testStats = await TestStats.findAll({
          where: { user_id: Number(user_id), test_id: Number(test_id) },
        });
        let score = 0;
        if (testStats) {
          _.forEach(testStats, async (testStat: TestStats) => {
            const question = await Question.findOne({
              where: { id: _.get(testStat, "question_id", "") },
            });
            if (!question) return;
            const { selected_answer, correct_answer } = testStat;
            if (_.isEqual(selected_answer, correct_answer)) {
              score += _.get(question, "points", 0);
            }
          });
        }
        let testPerformanceParams = {} as TestPerformance;
        _.assign(testPerformanceParams, {
          score: score,
          status: ExamStatus.completed,
          start_time: start_time,
          duration: duration,
          end_time: new Date(),
          user_id: user_id,
          test_id: test_id,
        });
        await TestPerformance.update(testPerformanceParams, {
          where: { id: test_performance_id },
        });
      }
      await ExamSessions.destroy({ where: { id } });
    }
  });
};

export default autoSubmit;
