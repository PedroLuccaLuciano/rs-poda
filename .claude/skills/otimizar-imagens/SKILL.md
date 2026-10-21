---
name: otimizar-imagens
description: Adiciona, troca ou remove fotos e logos do site da RS Poda sem perder desempenho no PageSpeed — gera as versões WebP otimizadas com scripts/optimize-images.py e liga a imagem no código com o componente <Picture>. Use sempre que o pedido envolver imagem no site, mesmo sem citar o script: "coloca essa foto na galeria", "troca a foto do hero", "novo cliente, adiciona o logo", "tira a foto X", "atualiza a foto do serviço de roçada", "a imagem está pesada/lenta", ou qualquer arquivo novo em public/images.
---

# Otimizar imagens (RS Poda)

O site carrega imagens de `public/images/opt/`, nunca os originais de `public/images/`. Os arquivos em `opt/` são gerados por `scripts/optimize-images.py`, que já recorta cada foto no formato em que ela aparece e cria vários tamanhos (o navegador baixa só o necessário). Se uma imagem entrar no site sem passar pelo script, ela vai pesada e a nota do PageSpeed cai — por isso todo o fluxo abaixo passa por ele.

## Passo a passo

1. **Coloque o original em `public/images/`** com um nome novo, em minúsculas e sem espaços/acentos (ex.: `poda-condominio.jpg`). Use JPG/PNG de boa qualidade; o script cuida do resto.
   - Trocando uma foto existente? Use um **nome novo** em vez de sobrescrever: `/images/*` tem cache de 30 dias (`public/_headers`), então quem já visitou o site continuaria vendo a foto antiga.

2. **Registre a imagem no script** (`scripts/optimize-images.py`):
   - Foto → dicionário `PHOTOS`: `"chave": ("arquivo.jpg", [variantes])`. A chave é o nome usado no código.
   - Logo → dicionário `LOGOS`: `"chave": ("arquivo.png", [alturas])`.
   - Escolha as variantes pela tabela abaixo, de acordo com **onde** a imagem aparece. Uma foto usada em dois lugares leva as duas variantes.

3. **Rode o script** na raiz do projeto:
   ```bash
   python3 scripts/optimize-images.py
   ```
   Precisa do Pillow (`pip install pillow` se faltar). Ele apaga e recria `public/images/opt/` e reescreve `src/lib/images.gen.ts` — não edite esse arquivo à mão.

4. **Use a imagem no código** (seção "Onde cada imagem é usada").

5. **Verifique** antes de commitar:
   ```bash
   npm run build
   ```
   O build pega erro de digitação no nome da imagem, mas **não** variante faltando: essa só aparece como erro ao abrir a página (`Imagem X sem variante "Y"`). Então abra o site (`npm run dev`) e confira se a página carrega e se o recorte ficou bom — o script corta pelo centro; se a parte importante da foto estiver na borda, avise o usuário.

6. **Commite** o original, os arquivos novos de `public/images/opt/`, `src/lib/images.gen.ts`, o script e o código alterado. O projeto é ligado ao Lovable: não reescreva histórico (sem force push/amend em commits já enviados).

## Variantes

| Variante | Onde aparece | Recorte | Larguras |
|---|---|---|---|
| `hero` | fundo do topo (computador) | foto inteira | 400–1200 |
| `hero-mobile` | fundo do topo (celular) | vertical 0,6 | 400–540 |
| `card` | cards de "Serviços" | 2:1 | 400–800 |
| `square` | "Galeria" | 6:5 | 400–800 |
| `full` | foto ampliada ao clicar na galeria | foto inteira | 400–1200 |
| `portrait` | "Antes e depois" | 4:5 | 320–640 |
| `bg` | fundo da chamada final (20% de opacidade) | foto inteira, comprimida e desfocada | 640–960 |

Toda foto da galeria precisa de `square` **e** `full`. Uma foto do topo precisa de `hero` **e** `hero-mobile`.

Logos usam a altura em pixels como variante (`h96`, `h168`…): ~1,75× a altura exibida. Clientes com classe `max-h-16` → altura ~80–104; com `max-h-24` (`tall: true`) → 168. Logo muito largo (ex.: 4:1) → use altura menor, para a largura não passar de ~300px.

## Onde cada imagem é usada

Tudo está em `src/routes/index.tsx`, salvo indicação:

- **Galeria** → array `galeria`: `{ image: "chave", alt: "...", category: "..." }`.
- **Serviços** → array `servicos`, campo `image: "chave"` (usa `card`).
- **Antes e depois** → array `antesDepois`, campos `before` / `after` (usam `portrait`).
- **Clientes** → array `clientes`: `{ image: "chave" as const, variant: "h104", alt: "Nome" }` (+ `tall: true` para logos mais quadrados).
- **Topo (hero)** → `<picture>` no começo de `Index()` e os dois `preload` no `head()` (procure `"equipe"`). Trocar a foto do topo = trocar a chave nos três lugares.
- **Chamada final** → `<Picture name="..." variant="bg" />` perto do `QuoteForm`.
- **Logo da RS Poda** → `src/components/Header.tsx` (`icone3-h96.webp`) e `Footer.tsx` (`icone3-h128.webp`); favicon em `src/routes/__root.tsx`.

Fora desses lugares, use o componente:
```tsx
import { Picture } from "@/components/Picture";

<Picture name="chave" variant="card" sizes="(min-width: 1024px) 270px, 100vw"
  alt="Descrição do que aparece na foto" loading="lazy" decoding="async" className="..." />
```
- `sizes` diz a largura em que a imagem é exibida; sem ele o navegador baixa a versão maior.
- `loading="lazy"` em tudo que fica abaixo da primeira tela; só a foto do topo leva `fetchPriority="high"`.
- `alt` descreve a foto em português (ajuda acessibilidade e SEO). Imagem puramente decorativa: `alt=""` e `aria-hidden="true"`.
- Uma variante nova (formato que ainda não existe) entra em `VARIANTS` no script, com `aspect` = largura/altura do espaço exibido.

## Removendo uma imagem

Tire a referência do código, apague a entrada em `PHOTOS`/`LOGOS` e rode o script de novo (ele limpa `opt/`). O original em `public/images/` pode ser apagado se não for usado em mais nada — confira com `grep -r "nome-do-arquivo" src` (o `equipe.jpeg` original é usado na prévia de link do WhatsApp/redes sociais).
