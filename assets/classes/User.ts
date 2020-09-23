type FSUser = {
  name: string,
  photoURL: string
}

export class User {
  name: string
  iconURL: string

  constructor ({
    name,
    iconURL
  }: {
    name: string,
    iconURL: string,
  }) {
    this.name = name
    this.iconURL = iconURL
  }
}

export const userConverter = {
  toFirestore (user: User) {
    return {
      name: user.name,
      iconURL: user.iconURL
    }
  },
  fromFirestore (snapshot: any, options: any) {
    const data: FSUser = snapshot.data(options)
    return new User(
      {
        name: data.name,
        iconURL: data.photoURL
      })
  }
}
