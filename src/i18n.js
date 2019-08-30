import zhLocale from 'element-ui/lib/locale/lang/zh-TW'
import enLocale from 'element-ui/lib/locale/lang/en'

const messages = {
  zh_TW: {
    ...zhLocale,
    base: {
      signIn: '登入',
      logout: '登出',
      login: '登入中',
      ok: '確定',
      cancel: '取消',
      account: '帳號',
      password: '密碼',
      noData: '沒有數據'
    },
    problem: {
      id: '題目ID',
      name: '題目名稱',
      tag: '題目標籤',
      sortBy: '排序方式',
      type: '類型',
      score: '分數',
      correctRate: '正確率',
      runTime: '運行時間',
      difficulty: '難易度',
      handDate: '繳交日期'
    },
    student: {
      header: {
        myCourse: '我的課程',
        courseList: '課程列表',
        problemList: '題目列表',
        scorePanel: '成績面板',
        myPage: '個人中心',
        rank: '排行榜',
        feedback: '意見回饋'
      },
      scorePanel: {
        correctRate: '正確率',
        gradeChart: '成績圖表',
        historyScore: '歷史成績'
      },
      myPage: {
        personalInfo: '個人資料',
        changePwd: '更改密碼',
        oriPwd: '原密碼',
        newPwd: '新密碼',
        answerStatus: '作答情況',
        systemSetting: '系統設定',
        todo: '未完成',
        solved: '已完成',
        best: '最佳解答',
        language: '系統語言',
        zh_tw: '繁體中文',
        en: '英文'
      },
      rank: {
        correctRank: '正確題數',
        correctTitle: '正確題數排行',
        bestRank: '最佳解答',
        bestTitle: '最佳解答排行',
        rank: '名次',
        account: '學生學號',
        name: '學生姓名',
        correctNum: '正確題數',
        bestNum: '最佳題數'
      },
      feedback: {
        modalTitle: '請輸入對課程的建議',
        getFeeback: '已經收到您的回饋！',
        errorFeedback: '傳送回饋失敗 :(',
        cancelFeedback: '取消輸入'
      }
    },
    // TODO:
    trAndAsst: {
      header: {
        courseList: '課程列表',
        goToTheCourse: '前往課程',
        qbank: '題庫系統'
      }
    },
    teacher: {
      header: {
        newCourse: '新增課程',
        editCourse: '編輯課程',
      },
      editCourse: {
        name: '課程名稱',
        semester: '課程學期',
        taList: '助教名單',
        class: '班級',
        ta: '助教',
        courseId: '課程ID',
        edit: '編輯課程',
        delete: '刪除課程',
        notJoined: '未加入',
        joined: '已加入'
      }
    }

  },
  en: {
    ...enLocale,
    base: {
      signIn: 'Sign In',
      logout: 'Logout',
      login: 'login',
      ok: 'ok',
      cancel: 'cancel',
      account: 'account',
      password: 'password',
      noData: 'No Data'
    },
    problem: {
      id: 'id',
      name: 'name',
      tag: 'tag',
      sortBy: 'sort by',
      type: 'type',
      score: 'score',
      correctRate: 'correct rate',
      runTime: 'run time',
      difficulty: 'difficulty',
      handDate: 'hand date'
    },
    student: {
      header: {
        myCourse: 'My Course',
        courseList: 'Courses',
        problemList: 'Problems',
        scorePanel: 'Progress',
        myPage: 'Personal Center',
        rank: 'Rank',
        feedback: 'Feedback'
      },
      scorePanel: {
        correctRate: 'Correct Rate',
        gradeChart: 'Grade Line',
        historyScore: 'History'
      },
      myPage: {
        personalInfo: 'Personal',
        changePwd: 'Change Password',
        oriPwd: 'Original Password',
        newPwd: 'New Password',
        answerStatus: 'Status',
        systemSetting: 'Setting',
        todo: 'todo',
        solved: 'solved',
        best: 'best',
        language: 'language',
        zh_tw: 'Traditional Chinese',
        en: 'English'
      },
      rank: {
        correctRank: 'Correct',
        correctTitle: 'Rank of Correct Answer',
        bestRank: 'Best',
        bestTitle: 'Rank of Best Answer',
        rank: 'rank',
        account: 'account',
        name: 'name',
        correctNum: 'correct number',
        bestNum: 'best number'
      },
      feedback: {
        modalTitle: 'Please enter a suggestion for the course',
        getFeeback: 'Successfully received your feedback！',
        errorFeedback: 'Failed to receive your feedback :(',
        cancelFeedback: 'Cancel input'
      }
     

    }
  },
}

export {messages};