import axios from "axios"

export type Game =
  | "Arena of Valor"
  | "Call of Duty Mobile"
  | "Free Fire"
  | "Genshin Impact"
  | "Honkai Impact"
  | "Honkai Star Rail"
  | "Mobile Legends"
  | "Punishing: Gray Raven"
  | "Sausage Man"
  | "Super SUS"
  | "Valorant"

interface CheckIgnParams {
  game: Game
  id: string
  zone?: string
}

export async function checkIgn({ game, id, zone }: CheckIgnParams) {
  const endpoint = "https://order-sg.codashop.com/initPayment.action"

  if (!id) {
    throw new Error("Bad Request: ID is required")
  }

  let body: string

  switch (game) {
    case "Arena of Valor":
      body = `voucherPricePoint.id=7946&voucherPricePoint.price=10000.0&voucherPricePoint.variablePrice=0&user.userId=${id}&voucherTypeName=AOV&shopLang=id_ID&voucherTypeId=1&gvtId=1`
      break
    case "Call of Duty Mobile":
      body = `voucherPricePoint.id=46114&voucherPricePoint.price=5000.0&voucherPricePoint.variablePrice=0&user.userId=${id}&voucherTypeName=CALL_OF_DUTY&shopLang=id_ID&voucherTypeId=1&gvtId=1`
      break
    case "Free Fire":
      body = `voucherPricePoint.id=8050&voucherPricePoint.price=1000.0&voucherPricePoint.variablePrice=0&user.userId=${id}&voucherTypeName=FREEFIRE&shopLang=id_ID&voucherTypeId=1&gvtId=1`
      break
    case "Genshin Impact":
      if (id.startsWith("6")) {
        zone = "os_usa"
      } else if (id.startsWith("7")) {
        zone = "os_euro"
      } else if (id.startsWith("8")) {
        zone = "os_asia"
      } else if (id.startsWith("9")) {
        zone = "os_cht"
      } else {
        throw new Error("Bad Request: Invalid ID prefix")
      }
      body = `voucherPricePoint.id=116054&voucherPricePoint.price=16500.0&voucherPricePoint.variablePrice=0&user.userId=${id}&user.zoneId=${zone}&voucherTypeName=GENSHIN_IMPACT&shopLang=id_ID`
      break
    case "Honkai Impact":
      body = `voucherPricePoint.id=48160&voucherPricePoint.price=16500.0&voucherPricePoint.variablePrice=0&user.userId=${id}&user.zoneId=&voucherTypeName=HONKAI_IMPACT&shopLang=id_ID`
      break
    case "Honkai Star Rail":
      if (id.startsWith("6")) {
        zone = "prod_official_usa"
      } else if (id.startsWith("7")) {
        zone = "prod_official_eur"
      } else if (id.startsWith("8")) {
        zone = "prod_official_asia"
      } else if (id.startsWith("9")) {
        zone = "prod_official_cht"
      } else {
        throw new Error("Bad Request: Invalid ID prefix")
      }
      body = `voucherPricePoint.id=855316&voucherPricePoint.price=16000.0&voucherPricePoint.variablePrice=0&user.userId=${id}&user.zoneId=${zone}&voucherTypeName=HONKAI_STAR_RAIL&shopLang=id_ID`
      break
    case "Mobile Legends":
      if (!zone) {
        throw new Error("Bad Request: Server ID is required for Mobile Legends")
      }
      body = `voucherPricePoint.id=4150&voucherPricePoint.price=1579.0&voucherPricePoint.variablePrice=0&user.userId=${id}&user.zoneId=${zone}&voucherTypeName=MOBILE_LEGENDS&shopLang=id_ID&voucherTypeId=1&gvtId=1`
      break
    case "Punishing: Gray Raven":
      if (zone?.toLowerCase().includes("ap")) {
        zone = "5000"
      } else if (zone?.toLowerCase().includes("eu")) {
        zone = "5001"
      } else if (zone?.toLowerCase().includes("na")) {
        zone = "5002"
      } else {
        throw new Error("Bad Request: Invalid zone")
      }
      body = `voucherPricePoint.id=259947&voucherPricePoint.price=15136.0&voucherPricePoint.variablePrice=0&user.userId=${id}&user.zoneId=${zone}&voucherTypeName=PUNISHING_GRAY_RAVEN&shopLang=id_ID`
      break
    case "Sausage Man":
      body = `voucherPricePoint.id=256513&voucherPricePoint.price=16000.0&voucherPricePoint.variablePrice=0&user.userId=${id}&user.zoneId=global-release&voucherTypeName=SAUSAGE_MAN&shopLang=id_ID`
      break
    case "Super SUS":
      body = `voucherPricePoint.id=266077&voucherPricePoint.price=13000.0&voucherPricePoint.variablePrice=0&user.userId=${id}&user.zoneId=&voucherTypeName=SUPER_SUS&shopLang=id_ID`
      break
    case "Valorant":
      body = `voucherPricePoint.id=115691&voucherPricePoint.price=15000.0&voucherPricePoint.variablePrice=0&user.userId=${id}&voucherTypeName=VALORANT&voucherTypeId=109&gvtId=139&shopLang=id_ID`
      break
    default:
      throw new Error("Bad Request: Invalid game")
  }

  try {
    const response = await axios.post(endpoint, body, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })

    const res = response.data

    const data = {
      success: res.success,
      game: res.confirmationFields.productName,
      name: res.confirmationFields.roles[0].role,
      id: res.user.userId,
    }

    return data
  } catch (error) {
    throw new Error("Cannot find nickname from your request.")
  }
}
