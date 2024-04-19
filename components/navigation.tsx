import styles from './navigation.module.css';
import { Genres } from '@/lib/types';
import { NavigationMenu } from '@infinityfx/fluid';
import { Animatable } from '@infinityfx/lively';
import Link from 'next/link';

export default function Navigation() {

    return <NavigationMenu.Root className={styles.navigation}>
        <NavigationMenu.Group label="Home" href="/" Link={Link} />

        <NavigationMenu.Group label="Catalogue" href="/catalogue" Link={Link} className={styles.menu}>
            <div className={styles.heading}>Genres</div>

            <Animatable inherit animate={{ scale: [0.8, 1], opacity: [0, 1], duration: .35, delay: .35 }}>
                {Object.entries(Genres).map(([value, name]) => {

                    return <NavigationMenu.Link key={value} href={`/catalogue/genre/${value}`} Link={Link}>
                        {name}
                    </NavigationMenu.Link>;
                })}
            </Animatable>
        </NavigationMenu.Group>
    </NavigationMenu.Root>;
}