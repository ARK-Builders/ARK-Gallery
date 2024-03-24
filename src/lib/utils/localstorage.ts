export class LocalStorageDB {
	private storageKey: string

	constructor(storageKey: string) {
		this.storageKey = storageKey
	}

	// Create operation
	create(data: any): void {
		localStorage.setItem(this.storageKey, JSON.stringify(data))
	}

	// Read operation (get all items)
	getAll(): [string] {
		const itemsString = localStorage.getItem(this.storageKey)
		return itemsString ? JSON.parse(itemsString) : []
	}

	// Update operation
	update(newData: any): void {
		localStorage.setItem(this.storageKey, JSON.stringify(newData))
	}

	// Delete operation
	// delete(name: string): void {
	// 	const items = this.getAll()
	// 	if (items.indexOf(name)) {
	// 		localStorage.setItem(this.storageKey, JSON.stringify(items))
	// 	}
	// }
}
