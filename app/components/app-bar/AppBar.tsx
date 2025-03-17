import MeInfo from '~/components/app-bar/MeInfo';
import { IMeInfo } from '~/data/types/userTypes';
import { BodyShort, Hide, HStack, Page } from '@navikt/ds-react';
import { Link } from '@remix-run/react';
import { ApiMenu } from '~/components/app-bar/ApiMenu';

export function AppBar({ me }: { me?: IMeInfo }) {
    return (
        <Page.Block as={'header'} className={'novari-header h-20'}>
            <HStack
                as="nav"
                justify="space-between"
                align="center"
                className={'h-full'}
                paddingInline={{ xs: '12', sm: '12', md: '12', lg: '20', xl: '32' }}>
                <HStack align="center">
                    <Link to={'/'} className={'kontroll'} id={'header-logo'}>
                        <BodyShort weight="semibold" size={'large'}>
                            FINT Kontroll
                        </BodyShort>
                    </Link>
                </HStack>

                <HStack align="center" gap={'8'}>
                    {me ? <ApiMenu me={me} /> : null}
                    <Hide below="lg" asChild>
                        <MeInfo me={me} />
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
