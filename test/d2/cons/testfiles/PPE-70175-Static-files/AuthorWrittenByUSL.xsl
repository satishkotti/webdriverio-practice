<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<!-- passed params -->
<xsl:param name="AuthorIDs"></xsl:param>
<xsl:param name="page"/>

<!-- local param -->
<xsl:param name="NumberOfResults">10</xsl:param>

	<xsl:template match="/">
		<GetSearchResults>
			<RequestorID>WebMD</RequestorID>
			<UserID>b053de91-d62c-422a-bf98-e720be0f68dd</UserID>
			<SearchTerm></SearchTerm>
			<SearchTypes>
				<SearchType>
					<SearchTypeName>Endeca</SearchTypeName>
					<Groups>
						<Group>
							<GroupName>default</GroupName>
							<QueryFields>
								<QueryOperation>
									<QueryField>
										<QueryFieldName>SiteType</QueryFieldName>
										<Operand>equals</Operand>
										<Value>cons</Value>
									</QueryField>
									<OperationType>AND</OperationType>
								</QueryOperation>
								<QueryOperation>
									<QueryField>
										<QueryFieldName>Author IDs</QueryFieldName>
										<Operand>equals</Operand>
										<Value><xsl:value-of select="$AuthorIDs"/></Value>
									</QueryField>
									<OperationType>and</OperationType>
								</QueryOperation>
							</QueryFields>
							<OutputFields>
								<OutputField>pTitle</OutputField>
								<OutputField>pClientURL</OutputField>
								<OutputField>pDescription</OutputField>
								<OutputField>pPubDisplay</OutputField>
							</OutputFields>
							<Limits>
								<Limit>
									<Name>NumOfResults</Name>
									<Value><xsl:value-of select="$NumberOfResults"/></Value>
								</Limit>
								<Limit>
									<Name>ResultsStart</Name>
									<Value><xsl:call-template name="ResultStartIndex"/></Value>
								</Limit>
							</Limits>
							<Weights></Weights>
							<SortOperations>
								<SortOperation>
									<SortField>pDate</SortField>
									<Value>desc</Value>
								</SortOperation>
							</SortOperations>
							<NavigationState>0</NavigationState>
							<requireSupplements>false</requireSupplements>
							<requireBreadCrumbs>false</requireBreadCrumbs>
							<requireDimSearchResults>false</requireDimSearchResults>
							<requireSuggestions>false</requireSuggestions>
							<requireRefinements>false</requireRefinements>
							<requireRedirects>false</requireRedirects>
						</Group>
					</Groups>
				</SearchType>
			</SearchTypes>
		</GetSearchResults>
	</xsl:template>

	<xsl:template name="ResultStartIndex">
		<xsl:choose>
			<xsl:when test="$page &gt; 0"><xsl:value-of select="(($page - 1) * $NumberOfResults)"/></xsl:when>
			<xsl:otherwise>0</xsl:otherwise>
		</xsl:choose>
	</xsl:template>

</xsl:stylesheet>
