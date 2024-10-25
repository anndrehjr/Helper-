#!/bin/bash
# Script para enviar um email

# Configurações
SUBJECT="Notificação"
TO="anndreh01@gmail.com"  # Altere para o seu endereço de e-mail
MESSAGE="Este é um teste de envio de email via script Bash."

# Envio do email
echo "$MESSAGE" | mail -s "$SUBJECT" "$TO"

echo "Email enviado para $TO."
