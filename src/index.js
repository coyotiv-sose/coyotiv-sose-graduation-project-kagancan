console.log('CatchProof is a social network for verified fish catches!')

// Users can create/join Groups; Users can create Catches (fish records)
// A Catch is shared either with specific Groups, or just with its owner (private)
// Full lists available: all Users, all Groups
// A Group's members list, a User's created/joined Groups, a User's Catches
// Catches can be verified, edited, and deleted
// A User can leave a Group, delete their account, and edit their profile

class Catch {
  groups = []
  verified = false

  constructor(owner, species, { size = null, note = '', visibility = 'group' } = {}) {
    this.owner = owner
    this.species = species
    this.size = size
    this.note = note
    this.visibility = visibility
    this.createdAt = new Date()
  }

  verify() {
    this.verified = true
  }

  edit(updates) {
    Object.assign(this, updates)
  }
}

class Group {
  members = []
  catches = []

  constructor(name) {
    this.name = name
  }

  addMember(user) {
    user.joinGroup(this)
  }

  removeMember(user) {
    user.leaveGroup(this)
  }

  edit(updates) {
    Object.assign(this, updates)
  }
}

class User {
  groups = []
  catches = []

  constructor(name) {
    this.name = name
  }

  createGroup(name) {
    const group = new Group(name)

    this.joinGroup(group)

    return group
  }

  joinGroup(group) {
    group.members.push(this)
    this.groups.push(group)
  }

  leaveGroup(group) {
    group.members = group.members.filter(member => member !== this)
    this.groups = this.groups.filter(g => g !== group)

    // When leaving a group, this user's catches also lose their share
    // with that group (the catch itself isn't deleted, just unlinked)
    this.catches.forEach(c => {
      c.groups = c.groups.filter(g => g !== group)
    })
    group.catches = group.catches.filter(c => c.owner !== this)
  }

  recordCatch(species, { size = null, note = '', groups = [], visibility = 'group' } = {}) {
    const catchRecord = new Catch(this, species, { size, note, visibility })

    if (visibility === 'group') {
      groups.forEach(group => {
        group.catches.push(catchRecord)
        catchRecord.groups.push(group)
      })
    }

    this.catches.push(catchRecord)

    return catchRecord
  }

  deleteCatch(catchRecord) {
    this.catches = this.catches.filter(c => c !== catchRecord)
    catchRecord.groups.forEach(group => {
      group.catches = group.catches.filter(c => c !== catchRecord)
    })
  }

  deleteAccount() {
    ;[...this.groups].forEach(group => this.leaveGroup(group))
    ;[...this.catches].forEach(c => this.deleteCatch(c))
  }

  editProfile(updates) {
    Object.assign(this, updates)
  }
}

// demo / smoke test

const kagan = new User('Kagan')
const derya = new User('Derya')

const trabzonGroup = kagan.createGroup('Trabzon Anglers')
const blackSeaGroup = derya.createGroup('Black Sea Coast')

kagan.joinGroup(blackSeaGroup)
derya.joinGroup(trabzonGroup)

console.log(`Kagan is a member of ${kagan.groups.length} groups.`)
console.log(`Derya is a member of ${derya.groups.length} groups.`)
console.log(
  `Trabzon Anglers has ${trabzonGroup.members.length} members: ${trabzonGroup.members
    .map(member => member.name)
    .join(', ')}.`
)

const anchovy = kagan.recordCatch('Anchovy', { size: 12, groups: [trabzonGroup, blackSeaGroup] })
const bonito = derya.recordCatch('Bonito', { size: 34, groups: [blackSeaGroup] })
const privateFish = derya.recordCatch('Sea Bass', { visibility: 'private' })

console.log(`Trabzon group has 1 shared catch: ${trabzonGroup.catches.length === 1}`)
console.log(`Black Sea group has 2 shared catches: ${blackSeaGroup.catches.length === 2}`)
console.log(`Private catch belongs to no group: ${privateFish.groups.length === 0}`)

anchovy.verify()
console.log(`Anchovy catch is verified: ${anchovy.verified === true}`)

bonito.edit({ size: 36, note: 'Caught early in the morning' })
console.log(`Bonito size updated to 36: ${bonito.size === 36}`)

kagan.leaveGroup(blackSeaGroup)
console.log(`After Kagan leaves, Black Sea group has ${blackSeaGroup.members.length} member(s).`)
console.log(`Anchovy catch is no longer linked to Black Sea group: ${!anchovy.groups.includes(blackSeaGroup)}`)
console.log(`Anchovy catch is still linked to Trabzon group: ${anchovy.groups.includes(trabzonGroup)}`)

derya.deleteCatch(bonito)
console.log(`Bonito catch removed from Black Sea group: ${!blackSeaGroup.catches.includes(bonito)}`)
console.log(`Derya now has ${derya.catches.length} catch(es).`)

derya.deleteAccount()
console.log(`After deleting account, Derya has 0 groups: ${derya.groups.length === 0}`)
console.log(`After deleting account, Derya has 0 catches: ${derya.catches.length === 0}`)
console.log(`Derya is no longer a member of Trabzon group: ${!trabzonGroup.members.includes(derya)}`)
