# Neurix Token (NRX)

## Setup

1. Clone repo & install dependencies:
```bash
npm install
```

2. Configure `.env`:
```
RPC_URL=...
MAINNET_RPC=...
PRIVATE_KEY=...
TEAM_WALLET=...
MARKETING_WALLET=...
DEV_WALLET=...
RESERVE_WALLET=...
REWARDS_WALLET=...
```

3. Compile and test:
```bash
npm run compile
npm run test
```

4. Deploy:
```bash
npm run deploy:rinkeby
```

## Vercel Integration

- For frontend (if added), place under `frontend/` and connect to Vercel via GitHub repo.


## 7. Code Quality: Lint & Formatter Tools

The following tools are integrated to ensure code quality and consistency:

### Solhint
- **Purpose**: Checks style and security rules in Solidity contracts.
- **Usage**:
  ```bash
  npx solhint "contracts/**/*.sol"
  ```

### ESLint
- **Purpose**: Detects syntax and style errors in JavaScript/TypeScript code.
- **Usage**:
  ```bash
  npm run lint
  ```

### Prettier
- **Purpose**: Automatically formats code according to specified style rules.
- **Usage**:
  ```bash
  npm run format
  npm run format:check
  ```

Bu araçlar, CI/CD iş akışınıza entegre edilerek her push'ta otomatik olarak çalışır ve kodun tutarlı, okunabilir ve hatasız kalmasına yardımcı olur.

## Mainnet Fork Tests

To test your contract security and integrations in real chain scenarios:

1. `.env` dosyanıza `MAINNET_RPC` add.
2. `hardhat.config.js` içinde verify fork settings.
3. Aşağıdaki komutla fork testlerini run:
```bash
npm run test -- test/MainnetFork.test.js
```

Test scenarios, DAI gibi ana zincirdeki token ve protokollerle etkileşimi doğrular.

## Frontend & Web3 Integration

1. `frontend/NextApp` klasörüne girin:
```bash
cd frontend/NextApp
npm install
```

2. `.env.local` dosyası oluşturun:
```
NEXT_PUBLIC_TOKEN_ADDRESS=<Deployed_NRX_Contract_Address>
```

3. Frontend'i run:
```bash
npm run dev
```

4. Tarayıcıda açın: `http://localhost:3000`  
   - **Connect Wallet** butonuyla MetaMask'e connect.  
   - View your NRX balance.

## Contact

For questions or partnership inquiries, reach us at: **palermoinsta1@gmail.com**


## Additional Recommendations

### CHANGELOG
Maintain a `CHANGELOG.md` at the project root:
```markdown
# Changelog

## [1.0.0] - 2025-07-10
### Added
- Initial ERC-20 upgradeable token contract with roles and vesting
- Frontend wallet connect and balance display
- CI/CD with lint, format checks, tests, and coverage
- Mainnet fork tests
- Investor overview documentation
```

### Upgrade Guide
Add an `UPGRADE_GUIDE.md` explaining how to perform UUPS upgrades:
```markdown
# Upgrade Guide

1. Update & test new implementation contract.
2. Run:
   ```
   npx hardhat run scripts/upgrade.js --network <network>
   ```
3. Verify proxy address remains the same and new logic is active.
```

### API Documentation
Create `API_DOCS.md` for future HTTP endpoints:
```markdown
# API Endpoints

## POST /api/verify
- Body: `{ barcode: string }`
- Response: `{ valid: boolean, score: number, metadata: object }`
```

### Frontend Enhancements
- Implement loading and error states around wallet connect and balance fetch.
- Add a button to download the whitepaper from `/public/whitepaper.pdf`.
- Include an email signup form to collect early adopters’ addresses.

### Analytics
- Integrate basic page view tracking (e.g. Google Analytics or Plausible).
- Add a badge or link to the analytics dashboard in the README.

### Custom Domain
If you plan to use a custom domain, document DNS/CNAME steps in the README:
```markdown
# Domain Setup

1. In Vercel dashboard, add your domain.
2. Create a CNAME record pointing to `cname.vercel-dns.com`.
3. Verify ownership and enforce HTTPS.
```
