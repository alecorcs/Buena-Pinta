import { Beer, BeerList, User } from "@/types/type";
import { getAuth } from "firebase/auth";
import { addDoc, collection, deleteDoc, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "../FirebaseConfig";

/**
 * This module provides functions to interact with the Firestore database
 * for managing beer entries in a beer application.
 */

//CRUD operations for beers

//Create operation

/**
 *  Adds a new user to the Firestore database.
 * @param {User} user - The user object to be added.
 * @returns {Promise<void>} A promise that resolves when the user is added.
 * @throws Will throw an error if the user object is not provided.
 */
export const addUser = async (user: User): Promise<void> => {

    if (!user) {
        return;
    }
    try {
        const userCollection = collection(db, "users");
        await addDoc(userCollection, {
            ...user
        });
        return Promise.resolve();
    } catch (error) {
        console.error("No se ha podido añadir el usuario a la BD, error: ", error)
    }

}

/**
 * Adds a new beer to the Firestore database.
 * @param {Beer} beer - The beer object to be added.
 * @returns {Promise<void>} A promise that resolves when the beer is added.
 * @throws Will throw an error if the user is not authenticated.
 */

export const addBeer = async (beer: Beer): Promise<void> => {

    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) {
        return;
    }
    try {
        const beersCollection = collection(db, "beers");
        const docRef = await addDoc(beersCollection, {
            ...beer,
            userId: user.uid,
        });

        await updateDoc(docRef, { id: docRef.id });

        return Promise.resolve();
    } catch (error) {
        console.error("No se ha podido añadir la Cerveza a la BD, error: ", error)
    }
};

/**
 * Adds an image to the Firestore database.
 * @param {string} imageUrl - The URL of the image to be added.
 * @returns {Promise<string | void>} A promise that resolves when the image is added.
 */
export const addImage = async (imageUrl: string): Promise<string | void> => {

    const auth = getAuth();
    const user = auth.currentUser;
    if (!imageUrl || !user) {
        return;
    }
    try {
        const res = await fetch(imageUrl);
        const blob = await res.blob();

        const storageRef = ref(storage, `images/${user.uid}/${Date.now()}`);
        await uploadBytes(storageRef, blob);
        const url = await getDownloadURL(storageRef);

        return url;
    } catch (error) {
        console.error("No se ha podido añadir la imagen a Storage, error: ", error)
    }
};

/**
 * Adds a new list to the Firestore database.
 * @param {list} list - The list object to be added.
 * @returns {Promise<void>} A promise that resolves when the beer is added.
 * @throws Will throw an error if the user is not authenticated.
 */
export const addList = async (list: BeerList): Promise<void> => {

    const auth = getAuth();
    const user = auth.currentUser;
    if (!list || !user) {
        return;
    }
    try {
        const listCollection = collection(db, "lists");
        const docRef = await addDoc(listCollection, {
            ...list,
            userId: user.uid
        });

        await updateDoc(docRef, { id: docRef.id });

        return Promise.resolve();
    } catch (error) {
        console.error("No se ha podido añadir la Lista a la BD, error: ", error)
    }


}

//Read operation
/**
 * Fetches a user from the Firestore database by their UID.
 * @param {string} uid - The UID of the user to be fetched.
 * @returns {Promise<User | null>} A promise that resolves to the user object or null if not found.
 */
export const fetchUser = async (uid: string): Promise<User | null> => {

    const auth = getAuth();
    const user = auth.currentUser;
    if (!user || user.uid !== uid) {
        return null;
    }
    const userDoc = await getDocs(query(collection(db, "users"), where("uid", "==", uid)));
    return userDoc.empty ? null : (userDoc.docs[0].data() as User);
};

/**
 * Fetches beers from the Firestore database based on a search query.
 * @param {string} queryParam - The search query to filter beers.
 * @returns {Promise<Beer[]>} A promise that resolves to an array of beers.
 */
export const fetchBeers = async (queryParam: string): Promise<Beer[]> => {

    const auth = getAuth();
    const user = auth.currentUser;

    const beersCollection = collection(db, "beers");

    if (!user) {
        return [];
    }

    const q = query(beersCollection, where("userId", "==", user.uid));
    const snapshot = await getDocs(q);
    const allBeers = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Beer[];

    if (!queryParam) {
        return allBeers;
    }

    const queryLower = queryParam.toLowerCase();

    return allBeers.filter(beer =>
        beer.name.toLowerCase().includes(queryLower) ||
        beer.country.toLowerCase().includes(queryLower) ||
        beer.types.toLowerCase().includes(queryLower) ||
        beer.alcoholContent.toString().includes(queryLower)
    );
};

/**
 * Fetches a list of beers from the Firestore database based on a search query.
 * @param {string} queryParam - The search query to filter beers.
 * @returns {Promise<BeerList[]>} A promise that resolves to an array of beer names.
 */

export const fetchLists = async (queryParam: string): Promise<BeerList[]> => {

    const auth = getAuth();
    const user = auth.currentUser;
    const listCollection = collection(db, "lists");

    if (!user) {
        return [];
    }

    const q = query(listCollection, where("userId", "==", user.uid));
    const snapshot = await getDocs(q);
    const allLists = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as BeerList[];

    if (!queryParam) {
        return allLists
    }

    const queryLower = queryParam.toLowerCase();

    return allLists
        .filter(list => list.name.toLowerCase().includes(queryLower))
}

//Update operation
/**
 * Updates a user in the Firestore database.
 * @param {User} user - The user object to be updated.
 * @returns {Promise<void>} A promise that resolves when the user is updated.
 * @throws Will throw an error if the user object is not provided.
 */
export const updateUser = async (userUpdate: User): Promise<void> => {

    const auth = getAuth();
    const user = auth.currentUser;
    if (!userUpdate) {
        return;
    }

    if (!user || user.uid !== userUpdate.uid) {
        return;
    }

    const userDoc = doc(db, "users", userUpdate.uid);
    await updateDoc(userDoc, {
        ...userUpdate
    });

    return Promise.resolve();
};

/**
 * Updates a beer in the Firestore database.
 * @param {string} beerId - The ID of the beer to be updated.
 * @param {Partial<Beer>} updatedBeer - The updated beer object.
 * @returns {Promise<void>} A promise that resolves when the beer is updated.
 */
export const updateBeer = async (beerId: string, updatedBeer: Partial<Beer>): Promise<void> => {

    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) {
        return;
    }
    const beerDoc = doc(db, "beers", beerId);
    await updateDoc(beerDoc, {
        ...updatedBeer
    });

    return Promise.resolve();
};

export const updateList = async (listId: string, updateList: Partial<BeerList>): Promise<void> => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) {
        return;
    }

    const listDoc = doc(db, "lists", listId);
    await updateDoc(listDoc, {
        ...updateList
    });

    return Promise.resolve();
}
//Delete operation
/**
 * Deletes a user from the Firestore database.
 * @param {string} uid - The UID of the user to be deleted.
 * @returns {Promise<void>} A promise that resolves when the user is deleted.
 */
export const deleteUser = async (uid: string): Promise<void> => {

    const auth = getAuth();
    const user = auth.currentUser;
    if (!user || user.uid !== uid) {
        return;
    }
    const userDoc = doc(db, "users", uid);
    await deleteDoc(userDoc);

    return Promise.resolve();
};

/**
 * Deletes a beer from the Firestore database.
 * @param {string} beerId - The ID of the beer to be deleted.
 * @returns {Promise<void>} A promise that resolves when the beer is deleted.
 */
export const deleteBeer = async (beerId: string): Promise<void> => {

    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) {
        return;
    }
    const beerDoc = doc(db, "beers", beerId);
    await deleteDoc(beerDoc);

    return Promise.resolve();
}
