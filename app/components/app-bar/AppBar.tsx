import MeInfo from '~/components/app-bar/MeInfo';
import { IMeInfo } from '~/data/types/userTypes';
import { BodyShort, Hide, HStack, Page } from '@navikt/ds-react';
import { Link } from '@remix-run/react';
import { Menu } from '~/components/app-bar/Menu';

export function AppBar(props: { me: IMeInfo; basePath?: string; source?: string }) {
    return (
        <Page.Block as={'header'} className={'novari-header h-20'}>
            <HStack
                as="nav"
                justify="space-between"
                align="center"
                className={'h-full'}
                paddingInline={{ xs: '12', sm: '12', md: '12', lg: '20', xl: '32' }}>
                <HStack align="center">
                    <Link to={'../'} className={'kontroll'}>
                        <BodyShort weight="semibold" size={'large'}>
                            FINT Kontroll
                        </BodyShort>
                    </Link>
                </HStack>

                <HStack align="center" gap={'8'}>
                    {props.me ? <Menu me={props.me} source={props.source} /> : null}
                    <Hide below="lg" asChild>
                        <MeInfo me={props.me} />
                    </Hide>
                    {/*<Button variant="primary"
                                    as={Link}
                                    to="/_oauth/logout">
                                Logg ut
                            </Button>


                            <Button variant="primary"
                                    as="a"
                                    href={`${props.basePath}/_oauth/logout`}>
                                Logg ut
                            </Button>
*/}
                </HStack>
            </HStack>
        </Page.Block>
    );
}
