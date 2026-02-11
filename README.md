# Educaju Mobile

Versão mobile do Educaju - app de estudo guiado com avaliação, construído com React Native + Expo.

## Funcionalidades

- **Configuração de estudo**: escolha matéria, conteúdo, quantidade de questões e tempo de estudo
- **Cronômetro de estudo**: timer regressivo com opção de pular
- **Quiz**: questões de múltipla escolha geradas por IA
- **Resultados**: pontuação detalhada com revisão de cada questão e explicações

## Pré-requisitos

- Node.js >= 18
- npm ou yarn
- Expo CLI (`npx expo`)
- Para iOS: macOS + Xcode
- Para Android: Android Studio + emulador

## Instalação

```bash
cd mobile
npm install
```

## Executando

```bash
# Iniciar o servidor de desenvolvimento
npx expo start

# Rodar no Android
npx expo start --android

# Rodar no iOS
npx expo start --ios
```

## Configuração da API

1. Copie o arquivo `.env.example` para `.env`:

    ```bash
    cp .env.example .env
    ```

2. Edite o arquivo `.env` para configurar a URL do seu backend:
    - **Emulador Android**: `http://10.0.2.2:3001`
    - **Simulador iOS**: `http://localhost:3001`
    - **Dispositivo físico**: use o IP da máquina na rede local (ex: `http://192.168.1.100:3001`)

3. Reinicie o servidor do Expo após alterar o `.env`:
    ```bash
    npx expo start --clear
    ```

**Variáveis disponíveis:**

- `EXPO_PUBLIC_API_BASE_URL`: URL base da API para desenvolvimento
- `EXPO_PUBLIC_API_BASE_URL_PROD`: URL base da API para produção
- `EXPO_PUBLIC_API_ENDPOINT_QUESTIONS`: Endpoint para geração de questões

## Estrutura

```
mobile/
├── App.tsx                   # Componente principal com lógica de estado
├── app.json                  # Configuração do Expo
├── package.json              # Dependências
├── assets/                   # Ícones e splash screen
├── components/
│   ├── Header.tsx            # Cabeçalho do app
│   ├── Footer.tsx            # Rodapé do app
│   └── ui/
│       ├── Button.tsx        # Botão reutilizável
│       ├── Card.tsx          # Card container
│       ├── Icons.tsx         # Ícones SVG
│       ├── Input.tsx         # Campo de entrada
│       └── RadioGroup.tsx    # Seleção de alternativas
├── constants/
│   ├── api.ts                # Configuração da API
│   └── theme.ts              # Cores, fontes, espaçamento
├── screens/
│   ├── SetupScreen.tsx       # Tela de configuração
│   ├── StudyingScreen.tsx    # Tela de estudo com timer
│   ├── QuizScreen.tsx        # Tela de questões
│   └── ResultsScreen.tsx     # Tela de resultados
└── types/
    └── index.ts              # Tipos TypeScript
```

## Paleta de Cores

| Cor              | Hex       | Uso                |
| ---------------- | --------- | ------------------ |
| Orange Primary   | `#e95a0c` | Botões, destaques  |
| Orange Secondary | `#db7407` | Hover states       |
| Red Primary      | `#dc2825` | Erros, quiz submit |
| Dark Gray        | `#111827` | Textos, header     |
| Cream            | `#fffbf7` | Background         |
