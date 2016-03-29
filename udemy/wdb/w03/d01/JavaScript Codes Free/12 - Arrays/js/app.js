var names = ['Alex', 'Billy', 'Dale'];

// Remove Billy
names.splice(1, 1);

// Add Joshua and Ashley
names.push('Joshua', 'Ashley');

// Add Sheba
names[4] = 'Sheba';

// Change Dale to Billy
names[1] = 'Billy';

// Add named index to end of array
names['colour'] = 'Blue';

console.log(names);