import fetch from 'node-fetch';

//目標slack送信
async function sendMessageToSlack() {
    const webhookUrl =
        "https://hooks.slack.com/services/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"; // あなたのSlack Webhook URLに置き換えてください

    const payload = {
        text: "こんにちは！",
    };

    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    };

    try {
        const response = await fetch(webhookUrl, options);

        if (response.ok) {
            console.log("Slackへのメッセージ送信が成功しました。");
        } else {
            console.error(
                "Slackへのメッセージ送信に失敗しました。",
                response.statusText
            );
        }
    } catch (error) {
        console.error(
            "Slackへのメッセージ送信中にエラーが発生しました:",
            error
        );
    }
}

sendMessageToSlack();

module.exports = send;