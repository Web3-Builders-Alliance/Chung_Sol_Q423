export type WbaPrereq = {
    "version": "0.1.0", "name": "wba_prereq", "instructions": [
        {
            "name": "complete",
            "accounts": [
                {
                    "name": "signer",
                    "isMut": true,
                    "isSigner": true
                },
                {
                    "name": "prereq",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "systemProgram",
                    "isMut": false,
                    "isSigner": false
                }
            ],
            "args": [
                {
                    "name": "github",
                    "type": "bytes"
                }
            ]
        },
        {
            "name": "update",
            "accounts": [
                {
                    "name": "signer",
                    "isMut": true,
                    "isSigner": true
                },
                {
                    "name": "prereq",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "systemProgram",
                    "isMut": false,
                    "isSigner": false
                }
            ],
            "args": [
                {
                    "name": "github",
                    "type": "bytes"
                }
            ]
        }
    ]
};
export const IDL: WbaPrereq = { "version": "0.1.0", "name": "wba_prereq", "instructions": [
    {
      "name": "complete",
      "accounts": [
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "prereq",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "github",
          "type": "bytes"
        }
      ]
    },
    {
      "name": "update",
      "accounts": [
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "prereq",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "github",
          "type": "bytes"
        }
      ]
    }
  ] };