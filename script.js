const feedbackForm = document.querySelector("#feedback-form");
const feedbackDialog = document.querySelector("#feedback-dialog");
const dialogMessage = document.querySelector("#dialog-message");
const dialogClose = document.querySelector("#dialog-close");
const currentYear = document.querySelector("#current-year");
const feedbackStatus = document.querySelector("#feedback-status");
const feedbackSubmit = feedbackForm.querySelector("button[type='submit']");

// Cole aqui a URL /exec gerada ao publicar o Google Apps Script como aplicativo da Web.
const FEEDBACK_ENDPOINT = "";

currentYear.textContent = new Date().getFullYear();

feedbackForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = new FormData(feedbackForm);
  const name = formData.get("name").trim();
  const rating = formData.get("rating");

  feedbackSubmit.disabled = true;
  feedbackSubmit.textContent = "Enviando...";
  feedbackStatus.className = "feedback-status";
  feedbackStatus.textContent = "Enviando seu feedback...";

  try {
    if (!FEEDBACK_ENDPOINT) {
      throw new Error("O formulário ainda não foi conectado ao serviço de feedback.");
    }

    await fetch(FEEDBACK_ENDPOINT, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
      body: new URLSearchParams(formData),
    });

    dialogMessage.textContent = `${name}, recebemos sua avaliação: "${rating}". Sua opinião é muito importante para o nosso projeto.`;
    feedbackDialog.showModal();
    feedbackForm.reset();
    feedbackStatus.className = "feedback-status feedback-status--success";
    feedbackStatus.textContent = "Feedback enviado com sucesso.";
  } catch (error) {
    feedbackStatus.className = "feedback-status feedback-status--error";
    feedbackStatus.textContent = error.message || "Não foi possível enviar agora. Tente novamente em instantes.";
  } finally {
    feedbackSubmit.disabled = false;
    feedbackSubmit.textContent = "Enviar feedback";
  }
});

dialogClose.addEventListener("click", () => {
  feedbackDialog.close();
});

feedbackDialog.addEventListener("click", (event) => {
  if (event.target === feedbackDialog) {
    feedbackDialog.close();
  }
});
