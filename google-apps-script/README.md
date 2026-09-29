# Armazenamento dos feedbacks

Este código deve ser usado como um Apps Script vinculado à planilha **Feedbacks — Guardiões da Infância**.

1. Na planilha, abra **Extensões > Apps Script**.
2. Substitua o conteúdo de `Code.gs` pelo conteúdo deste diretório.
3. Clique em **Implantar > Nova implantação > Aplicativo da Web**.
4. Configure **Executar como: Eu** e **Quem pode acessar: Qualquer pessoa**.
5. Autorize o script e copie a URL terminada em `/exec`.
6. Cole essa URL em `FEEDBACK_ENDPOINT`, no arquivo `script.js` do site.

A planilha permanece privada. Somente o endpoint público recebe os envios e o script aceita apenas os quatro campos esperados.
