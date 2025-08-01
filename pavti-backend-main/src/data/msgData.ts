// export const msgData = {
//   DATA: {
//     MSGRPT: [
//       {
//         "Sl No": 1,
//         Rasoidt: "31-Mar-26",
//         Name: "ઘનશ્યામભાઈ પ્રવિણચંદ્ર દવે",
//         Nimit: "Rajipo",
//         Status: "Yes",
//         ISD: "+91",
//         "Mobile No": "9884610525",
//         Message:
//           "જય સ્વામિનારાયણ ઘનશ્યામભાઈ પ્રવિણચંદ્ર દવે \r\nઆજે તમારી શ્રી સ્વામિનારાયણ મંદિર કુંડળધામમાં રસોઈ હતી. \r\nમહારાજ, પૂ.ગુરૂજી અને સંતો વગેરે ખૂબ જમ્યા અને જમાડયાં. રસોઇ આપનાર માટે પૂ.ગુરૂજી અને સંતો વગેરે પ્રાર્થના કરીએ છીએ કે શ્રીહરિ તમારૂં ખૂબ સારૂ કરે.\r\nFrom - શ્રી સ્વામિનારાયણ મંદિર કુંડળધામ",
//       },
//       {
//         "Sl No": 2,
//         Rasoidt: "31-Mar-26",
//         Name: "જયભાઈ ઘનશ્યામભાઈ દવે",
//         Nimit: "Education",
//         Status: "Yes",
//         ISD: "+91",
//         "Mobile No": "9884610525",
//         Message:
//           "જય સ્વામિનારાયણ જયભાઈ ઘનશ્યામભાઈ દવે \r\nઆજે તમારી શ્રી સ્વામિનારાયણ મંદિર કુંડળધામમાં રસોઈ હતી. \r\nમહારાજ, પૂ.ગુરૂજી અને સંતો વગેરે ખૂબ જમ્યા અને જમાડયાં. રસોઇ આપનાર માટે પૂ.ગુરૂજી અને સંતો વગેરે પ્રાર્થના કરીએ છીએ કે શ્રીહરિ તમારૂં ખૂબ સારૂ કરે.\r\nFrom - શ્રી સ્વામિનારાયણ મંદિર કુંડળધામ",
//       },
//     ],
//   },
// };

export const msgData = {
  DATA: {
    MSGRPT: [
      {
        "Sl No": 1,
        Rasoidt: "31-Mar-26",
        Name: "ઘનશ્યામભાઈ પ્રવિણચંદ્ર દવે",
        Nimit: "Rajipo",
        Status: "Yes",
        ISD: "+91",
        "Mobile No": "9898391207",
        Message: {
          type: "template",
          template: {
            name: "rasoi_welcome", // ✅ use your exact approved template name
            language: { code: "gu_IN" },
            components: [
              {
                type: "body",
                parameters: [
                  { type: "text", text: "ઘનશ્યામભાઈ પ્રવિણચંદ્ર દવે" },
                  { type: "text", text: "31-Mar-26" },
                ],
              },
            ],
          },
        },
      },
      {
        "Sl No": 2,
        Rasoidt: "31-Mar-26",
        Name: "જયભાઈ ઘનશ્યામભાઈ દવે",
        Nimit: "Education",
        Status: "Yes",
        ISD: "+91",
        "Mobile No": "6352352558",
        Message: {
          type: "template",
          template: {
            name: "rasoi_welcome",
            language: { code: "gu_IN" },
            components: [
              {
                type: "body",
                parameters: [
                  { type: "text", text: "જયભાઈ ઘનશ્યામભાઈ દવે" },
                  { type: "text", text: "31-Mar-26" },
                ],
              },
            ],
          },
        },
      },
    ],
  },
};
