(() => {
  const hasVietnamese = (text) => /[ăâđêôơưáàảãạấầẩẫậắằẳẵặéèẻẽẹếềểễệíìỉĩịóòỏõọốồổỗộớờởỡợúùủũụứừửữựýỳỷỹỵ]/i.test(text || "");
  const firstAnswer = (item) => Array.isArray(item?.answers) ? item.answers[0] : "";

  function localizeExplanation(item) {
    const original = String(item.explanation || "").trim();
    if (!original || hasVietnamese(original)) return original;
    const answer = firstAnswer(item);
    let match;

    if ((match = original.match(/^Use (.+?)(?::\s*(.+))?\.?$/i))) {
      const example = match[2] || answer;
      return `Áp dụng đúng cấu trúc ${match[1]}.${example ? ` Câu hoàn chỉnh là: ${example}.` : ""}`;
    }
    if ((match = original.match(/^(?:A |The )?(?:past )?(?:yes\/no |information )?question uses (.+?)(?::\s*(.+))?\.?$/i))) {
      const example = match[2] || answer;
      return `Câu hỏi được lập theo cấu trúc ${match[1]}.${example ? ` Câu hoàn chỉnh là: ${example}.` : ""}`;
    }
    if ((match = original.match(/^Put the words in (?:the correct |question )?order:\s*(.+)$/i))) {
      return `Sắp xếp các từ theo đúng trật tự. Câu hoàn chỉnh là: ${match[1]}`;
    }
    if ((match = original.match(/^The (?:complete|correct) (question|sentence|word) is:\s*(.+)$/i))) {
      const label = match[1].toLowerCase() === "question" ? "Câu hỏi" : match[1].toLowerCase() === "sentence" ? "Câu" : "Từ";
      return `${label} hoàn chỉnh là: ${match[2]}`;
    }
    if ((match = original.match(/^The completed word is (.+?)\.?$/i)) ||
        (match = original.match(/^The letters form (.+?)\.?$/i)) ||
        (match = original.match(/^The correct word is (.+?)\.?$/i))) {
      return `Từ hoàn chỉnh là ${match[1]}.`;
    }
    if ((match = original.match(/^Adding .+ completes (?:the word )?(.+?)\.?$/i))) {
      return `Điền các chữ cái còn thiếu để tạo thành từ ${match[1]}.`;
    }
    if ((match = original.match(/^The word in the audio is (.+?)\.?$/i))) {
      return `Từ nghe được trong audio là ${match[1]}.`;
    }
    if ((match = original.match(/^(.+?) has (one|two|three|four) syllables?:\s*(.+?)\.?$/i))) {
      const number = { one: "một", two: "hai", three: "ba", four: "bốn" }[match[2].toLowerCase()];
      return `Từ ${match[1]} có ${number} âm tiết: ${match[3]}.`;
    }
    if ((match = original.match(/^(.+?) is (singular|plural)(?: here)?, so use (.+?)(?::\s*(.+))?\.?$/i))) {
      const quantity = match[2].toLowerCase() === "singular" ? "số ít" : "số nhiều";
      const example = match[4] || answer;
      return `${match[1]} là chủ ngữ ${quantity}, vì vậy dùng ${match[3]}.${example ? ` Câu hoàn chỉnh là: ${example}.` : ""}`;
    }
    if (/happened yesterday|past action/i.test(original) && /becomes|use didn't|base verb/i.test(original)) {
      return `Dấu hiệu trong câu cho biết hành động đã xảy ra trong quá khứ. Đáp án đúng là ${answer}.`;
    }
    if (/^The audio (?:answer|says|describes)|^According to the audio|in the audio/i.test(original)) {
      return `Đối chiếu nội dung audio, đáp án đúng là ${answer}.`;
    }
    if (/^Picture [a-d]|^The picture|picture shows|picture does not show/i.test(original)) {
      return `Quan sát đúng chi tiết trong hình, đáp án là ${answer}.`;
    }
    if (/answer key|official answer/i.test(original)) {
      return `Đối chiếu đáp án gốc, đáp án đúng là ${answer}.`;
    }
    if ((match = original.match(/^(.+?) means (.+?)\.?$/i))) {
      return `Từ ${match[1]} có nghĩa là “${match[2]}”. Đáp án đúng là ${answer}.`;
    }
    if (/time cue|at night|afternoon|evening|tomorrow|yesterday/i.test(original)) {
      return `Dựa vào dấu hiệu thời gian trong câu hoặc hình, đáp án đúng là ${answer}.`;
    }
    if (/belongs to|whose/i.test(original)) {
      return `Xác định người sở hữu rồi dùng đúng đại từ sở hữu. Đáp án là ${answer}.`;
    }
    if (/heavier|lighter|longer|shorter|bigger|smaller|comparative/i.test(original)) {
      return `So sánh hai đối tượng trong hình rồi dùng đúng dạng so sánh hơn. Đáp án là ${answer}.`;
    }
    if (/shortest|heaviest|lightest|longest|superlative/i.test(original)) {
      return `So sánh tất cả đối tượng trong hình rồi dùng đúng dạng so sánh nhất. Đáp án là ${answer}.`;
    }
    return `Đối chiếu câu hỏi với dữ kiện trong hình hoặc audio. Đáp án đúng là ${answer}.`;
  }

  const labels = {
    "Complete the word": "Hoàn thành từ",
    "Matching picture": "Hình tương ứng",
    "Correct picture": "Hình đúng",
    "Picture label": "Nhãn hình",
    "Write the word": "Viết từ",
    "Word from the audio": "Từ nghe được",
    "Complete question": "Hoàn thành câu hỏi",
    "Full question": "Câu hỏi hoàn chỉnh",
    "Complete answer": "Hoàn thành câu trả lời",
    "Full answer": "Câu trả lời hoàn chỉnh",
    "Answer from the audio": "Câu trả lời theo audio",
    "Complete sentence": "Hoàn thành câu",
    "True or False": "Đúng hay Sai",
    "Unscrambled word": "Từ đã sắp xếp",
    "Number of syllables": "Số âm tiết",
    "Missing word": "Từ còn thiếu"
  };

  function walk(value) {
    if (!value || typeof value !== "object") return;
    if (typeof value.explanation === "string") value.explanation = localizeExplanation(value);
    if (typeof value.label === "string" && labels[value.label]) value.label = labels[value.label];
    Object.values(value).forEach(walk);
  }

  try {
    if (typeof sections !== "undefined") walk(sections);
  } catch {}

  const uiText = {
    "Finish the test": "Hoàn thành bài kiểm tra",
    "Check your work before viewing the answers": "Kiểm tra lại bài trước khi xem đáp án",
    "Mark test and view explanations": "Chấm bài và xem giải thích",
    "Practice result": "Kết quả luyện tập",
    "Review answers to correct": "Xem lại câu cần sửa",
    "Start again": "Làm lại bài",
    "points completed": "điểm đã hoàn thành"
  };
  document.querySelectorAll("p, h2, button, span").forEach((element) => {
    const text = element.textContent.trim();
    if (uiText[text] && element.children.length === 0) element.textContent = uiText[text];
  });
})();
